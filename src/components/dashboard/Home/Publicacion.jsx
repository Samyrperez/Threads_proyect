import React, { useState, useEffect } from "react";
import "./Publicacion.css";
import HeartIcon from "../../icons/HeartIcon";
import CommentIcon from "../../icons/CommentIcon";
import RepostIcon from "../../icons/RepostIcon";
import SaveIcon from "../../icons/SaveIcon";
import ModalPerfilUsuario from "../Home/ModalPerfilUsuario";
import { darLikeComentario } from "../../../api/publicaciones/darLikeComentario"; // ajusta según tu estructura
import { obtenerLikesComentario } from "../../../api/publicaciones/obtenerLikesComentario";
import { eliminarLikeComentario } from "../../../api/publicaciones/eliminarLikeComentario";



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
    comentarios  = [],
}) => {
    const [liked, setLiked] = useState(false);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [likeCount, setLikeCount] = useState(likes); // contador local
    const [comentariosConLike, setComentariosConLike] = useState([]);

    const userId = parseInt(localStorage.getItem("userId"));
    
    

    const handleLikeComentario = async (comentarioId) => {
        try {
            const comentarioActual = comentariosConLike.find(c => c.id === comentarioId);
    
            // Si es un comentario
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
                // 👇 Si es la publicación principal
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

    console.log("Texto que llega a Publicacion:", texto);

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
                            <span className="username">{usuario.username}</span>
                            <span className="time">{tiempo}</span>
                        </div>

                        <div
                            className="post-texto"
                            dangerouslySetInnerHTML={{ __html: decodeHTML(texto) }}
                        />
                    </div>

                    {imagen && (
                        <div className="post-media">
                            <img src={imagen} alt="contenido" />
                        </div>
                    )}

                    <div className="post-footer">
                            <span onClick={() => handleLikeComentario(id)} style={{ cursor: "pointer" }}>
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
                                        </div>
                                        <div className="contenido">
                                            {/* Mostrar imagen base64 si está presente */}
                                            {comentario.contenido?.includes("data:image/") && (
                                                <img
                                                    src={comentario.contenido.match(/src="([^"]+)"/)?.[1]}
                                                    alt="contenido"
                                                    style={{ maxWidth: "100%", borderRadius: "8px", marginTop: "8px" }}
                                                />
                                            )}

                                            {/* Botón de like para el comentario */}
                                            <div
                                                className="like-comentario"
                                                onClick={() => {
                                                    if (!comentario.me_gusta_usuario) {
                                                        handleLikeComentario(comentario.id);
                                                    } else {
                                                        console.log("⚠️ Ya diste like a este comentario.");
                                                    }
                                                }}
                                                style={{
                                                    cursor: "pointer",
                                                    marginTop: "8px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "6px"
                                                }}
                                            >
                                                <HeartIcon filled={comentario.me_gusta_usuario} color={comentario.me_gusta_usuario ? "red" : "currentColor"} />
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
