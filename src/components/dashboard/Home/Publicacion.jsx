import React, { useState } from "react";
import "./Publicacion.css";
import HeartIcon from "../../icons/HeartIcon";
import CommentIcon from "../../icons/CommentIcon";
import RepostIcon from "../../icons/RepostIcon";
import SaveIcon from "../../icons/SaveIcon";
import ModalPerfilUsuario from "../Home/ModalPerfilUsuario"
;



const Publicacion = ({ usuario, tiempo, texto, imagen, likes, respuestas, compartidos, guardados }) => {
    const [liked, setLiked] = useState(false);

    const [modalAbierto, setModalAbierto] = useState(false);

    return (
        <div className="post">

            <div className="container-posts">
                <div className="post-avatar" onClick={() => setModalAbierto(true)} style={{ cursor: "pointer" }}>
                    <img src={usuario.avatar} className="avatar" alt="avatar" />
                </div>


                <div className="post-body">

                    <div className="post-header">
                        <div className="user-info">
                            <span className="username">{usuario.nombre}</span>
                            <span className="time">{tiempo}</span>
                        </div>
                        <p>{texto}</p>
                    </div>

                    <div className="post-content">
                        {imagen && (
                            <div className="post-media">
                                <img src={imagen} alt="contenido" />
                            </div>
                        )}
                    </div>

                    <div className="post-footer">
                        <span onClick={() => setLiked(!liked)} style={{ cursor: "pointer" }}>
                            <HeartIcon filled={liked} color={liked ? "red" : "currentColor"} />
                            <span>{liked ? likes + 1 : likes}</span>
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
