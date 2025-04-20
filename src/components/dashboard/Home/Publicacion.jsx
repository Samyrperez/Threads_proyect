import React, { useState, useEffect } from "react";
import "./Publicacion.css";
import HeartIcon from "../../icons/HeartIcon";
import CommentIcon from "../../icons/CommentIcon";
import RepostIcon from "../../icons/RepostIcon";
import SaveIcon from "../../icons/SaveIcon";
import ModalPerfilUsuario from "../Home/ModalPerfilUsuario";
import { darLikeComentario } from "../../../api/publicaciones/darLikeComentario";
import { obtenerLikesComentario } from "../../../api/publicaciones/obtenerLikesComentario";
import { eliminarLikeComentario } from "../../../api/publicaciones/eliminarLikeComentario";
import { eliminarComentario } from "../../../api/publicaciones/eliminarComentario";

const Publicacion = ({
    id,
    usuario,
    tiempo,
    texto,
    imagen,
    likes,
    respuestas,
    compartidos,
    guardados,
    comentarios = [],
}) => {
    const [liked, setLiked] = useState(false);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);
    const [comentariosConLike, setComentariosConLike] = useState([]);
    const [mostrarMenu, setMostrarMenu] = useState(null);

    const userId = parseInt(localStorage.getItem("userId"));

    const handleLikeComentario = async (comentarioId) => {
        try {
            const comentarioActual = comentariosConLike.find(c => c.id === comentarioId);
            if (comentarioActual) {
                if (!comentarioActual?.me_gusta_usuario) {
                    await darLikeComentario(comentarioId, userId);
                } else {
                    await eliminarLikeComentario(comentarioId, userId);
                }

                const usuariosQueDieronLike = await obtenerLikesComentario(comentarioId);
                const yaDioLike = usuariosQueDieronLike.some(u => u.id === userId);

                setComentariosConLike(prev =>
                    prev.map(c =>
                        c.id === comentarioId
                            ? {
                                ...c,
                                me_gusta_usuario: yaDioLike,
                                me_gusta_total: yaDioLike
                                    ? (c.me_gusta_total || 0) + 1
                                    : Math.max((c.me_gusta_total || 1) - 1, 0)
                            }
                            : c
                    )
                );
            } else {
                if (!liked) {
                    const res = await darLikeComentario(comentarioId, userId);
                    if (res?.code === 200) {
                        setLiked(true);
                        setLikeCount(prev => prev + 1);
                    }
                } else {
                    const res = await eliminarLikeComentario(comentarioId, userId);
                    if (res?.code === 200) {
                        setLiked(false);
                        setLikeCount(prev => Math.max(prev - 1, 0));
                    }
                }
            }
        } catch (error) {
            console.error("Error manejando el like:", error);
        }
    };

    const handleEliminar = async (comentarioId) => {
        const confirmado = window.confirm("¿Seguro que quieres eliminar este comentario?");
        if (confirmado) {
            const res = await eliminarComentario(userId, comentarioId);
            if (res?.code === 200) {
                setComentariosConLike(prev => prev.filter(c => c.id !== comentarioId));
                setMostrarMenu(null);
            }
        }
    };

    useEffect(() => {
        const verificarLikePublicacion = async () => {
            try {
                const usuariosQueDieronLike = await obtenerLikesComentario(id);
                const yaDioLike = usuariosQueDieronLike.some(u => u.id === userId);
                setLiked(yaDioLike);
            } catch (error) {
                console.error("❌ Error verificando like en la publicación:", error);
            }
        };

        verificarLikePublicacion();
    }, [id, userId]);

    useEffect(() => {
        const cargarLikes = async () => {
            const nuevosComentarios = await Promise.all(
                comentarios.map(async ({ comentario }) => {
                    const usuariosQueDieronLike = await obtenerLikesComentario(comentario.id);
                    const yaDioLike = usuariosQueDieronLike.some(u => u.id === userId);
                    return {
                        ...comentario,
                        me_gusta_usuario: yaDioLike
                    };
                })
            );
            setComentariosConLike(nuevosComentarios);
        };

        cargarLikes();
    }, [comentarios, userId]);

    const decodeHTML = (html) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    const avatarUrl = usuario.avatar?.startsWith("/uploads")
        ? `https://dockerapps.pulzo.com/threads${usuario.avatar}`
        : usuario.avatar || "/default-avatar.png";

    return (
        <div className="post">
            <div className="container-posts">
                <div
                    className="post-avatar"
                    onClick={() => setModalAbierto(true)}
                    style={{ cursor: "pointer" }}
                >
                    <img src={avatarUrl} className="avatar" alt="avatar" />
                </div>

                <div className="post-body">
                    <div className="post-header" >
                        <div className="user-info">
                            <span className="username">{usuario.username}</span>
                            <span className="time">{tiempo}</span>
                        </div>

                        {usuario.id === userId && (
                            <div className="menu-container">
                                <button
                                    className="menu-button"
                                    onClick={() =>
                                        setMostrarMenu((prev) =>
                                            prev === id ? null : id
                                        )
                                    }
                                >
                                    ⋯
                                </button>

                                {mostrarMenu === id && (
                                    <div className="dropdown-menu">
                                        <button onClick={() => handleEliminar(id)}>
                                            Eliminar publicación
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div
                        className="post-texto"
                        dangerouslySetInnerHTML={{ __html: decodeHTML(texto) }}
                    />

                    {imagen && (
                        <div className="post-media">
                            <img src={imagen} alt="contenido" />
                        </div>
                    )}

                    <div className="post-footer">
                        <span onClick={() => handleLikeComentario(id)} >
                            <HeartIcon filled={liked} color={liked ? "red" : "currentColor"} />
                            <span>{likeCount}</span>
                        </span>

                        <span>
                            <CommentIcon />
                            <span>{respuestas}</span>
                        </span>
                        <span>
                            <RepostIcon />
                            <span>{compartidos}</span>
                        </span>
                        <span>
                            <SaveIcon />
                            <span>{guardados}</span>
                        </span>
                    </div>

                    {comentarios.length > 0 && (
                        <div className="comentarios">
                            {comentariosConLike.map((comentario) => {
                                const avatarComentario = comentario.usuario.avatar?.startsWith("/uploads")
                                    ? `https://dockerapps.pulzo.com/threads${comentario.usuario.avatar}`
                                    : comentario.usuario.avatar || "/default-avatar.png";

                                return (
                                    <div key={comentario.id} className="comentario">
                                        <div className="comentario-header">
                                            <img src={avatarComentario} alt="avatar" className="avatar" />
                                            <div>
                                                <strong>{comentario.usuario.name}</strong>{" "}
                                                <span className="username">{comentario.usuario.username}</span>
                                            </div>

                                            {comentario.usuario.id === userId && (
                                                <div className="comentario-menu-wrapper">
                                                    <button
                                                        className="comentario-menu-boton"
                                                        onClick={() =>
                                                            setMostrarMenu((prev) =>
                                                                prev === comentario.id ? null : comentario.id
                                                            )
                                                        }
                                                    >
                                                        ⋯
                                                    </button>

                                                    {mostrarMenu === comentario.id && (
                                                        <div className="comentario-dropdown-menu">
                                                            <button
                                                                className="comentario-opcion-eliminar"
                                                                onClick={() => handleEliminar(comentario.id)}
                                                            >
                                                                Eliminar comentario
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className="contenido">
                                            {comentario.contenido?.includes("data:image/") && (
                                                <img
                                                    src={comentario.contenido.match(/src="([^"]+)"/)?.[1]}
                                                    alt="contenido"
                                                />
                                            )}

                                            <div
                                                className="like-comentario"
                                                onClick={() => handleLikeComentario(comentario.id)}
                                            >
                                                <HeartIcon
                                                    filled={comentario.me_gusta_usuario}
                                                    color={comentario.me_gusta_usuario ? "red" : "currentColor"}
                                                />
                                                <span>{comentario.me_gusta_total || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {modalAbierto && (
                <ModalPerfilUsuario
                    usuario={usuario}
                    onClose={() => setModalAbierto(false)}
                />
            )}
        </div>
    );
};

export default Publicacion;
