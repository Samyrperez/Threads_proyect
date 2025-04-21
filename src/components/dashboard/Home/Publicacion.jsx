import React, { useState, useEffect } from "react";
import "./Publicacion.css";
import HeartIcon from "../../icons/HeartIcon";
import CommentIcon from "../../icons/CommentIcon";
import RepostIcon from "../../icons/RepostIcon";
import SaveIcon from "../../icons/SaveIcon";
import DeleteIcon from "../../icons/DeleteIcon";
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
    
    const handleEliminarComentario = async (comentarioId) => {
        console.log("🧪 Usuario logueado:", userId);
        console.log("🧪 Comentario :", comentarioId);
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este comentario?");
        if (!confirmDelete) return;
    
        try {
            console.log("🧪 Eliminando comentario:", { userId, comentarioId });
            const res = await eliminarComentario(userId, comentarioId);
            if (res?.code === 200) {
                setComentariosConLike(prev =>
                    prev.filter(c => c.comentario.id !== comentarioId)
                );
            } else {
                console.error("❌ Error al eliminar el comentario:", res?.message);
            }
        } catch (error) {
            console.error("❌ Error en handleEliminarComentario:", error);
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
                    <div className="post-header">
                        <div className="user-info">
                            <span className="username">{usuario.username} // Este es el id: {id}</span>
                            <span className="time">{tiempo}</span>
                        </div>
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
                        <span onClick={() => handleEliminarComentario(id)}>
                            <DeleteIcon />
                        </span>
                    </div>

                    {/* {comentarios.length > 0 && (
                        
                        <div className="comentarios">
                            {comentariosConLike.map((comentario) => {
                                
                                const avatarComentario = comentario.usuario.avatar?.startsWith("/uploads")
                                    ? `https://dockerapps.pulzo.com/threads${comentario.usuario.avatar}`
                                    : comentario.usuario.avatar || "/default-avatar.png";

                                const imagenBase64 = comentario.contenido?.match(/src="([^"]+)"/);

                                return (
                                    <div key={comentario.id} className="comentario">
                                        <div className="comentario-header">
                                            <img src={avatarComentario} alt="avatar" className="avatar" />
                                            <div>
                                                <strong>{comentario.usuario.name}</strong>{" "}
                                                <span className="username">{comentario.usuario.username}{comentario.id} </span>
                                            </div>

                                            {comentario.usuario.id === userId && (
                                                <DeleteIcon onClick={() => handleEliminarComentario(comentario.id)} />
                                            )}
                                        </div>


                                        <div className="contenido">
                                            {imagenBase64 && (
                                                <img src={imagenBase64[1]} alt="contenido" />
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
            
                    )} */}
                </div>
            </div>

            {modalAbierto && (
                <ModalPerfilUsuario
                    usuarioASeguir={usuario}
                    onClose={() => setModalAbierto(false)}
                />
            )}
        </div>
    );
};

export default Publicacion;
