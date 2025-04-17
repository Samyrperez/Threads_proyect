import React, { useState } from "react";
// import { seguirUsuario } from "../../../api/usuarios/seguirUsuario"; // Ajusta el path según tu estructura
 // import { dejarDeSeguirUsuario } from "../../../api/usuarios/dejarDeSeguirUsuario";
import "./ModalPerfilUsuario.css";

const ModalPerfilUsuario = ({ usuario, onClose }) => {
    const [siguiendo, setSiguiendo] = useState(false);

    if (!usuario) return null;

    const manejarClickSeguir = () => {
        setSiguiendo(!siguiendo);
        // Aquí podrías agregar la lógica para llamar a tu API en el futuro
    };

    //     // Con backend
    // import { dejarDeSeguirUsuario } from "../../../api/usuarios/dejarDeSeguirUsuario";

    // const manejarClickSeguir = async () => {
    //     try {
    //         if (siguiendo) {
    //             await dejarDeSeguirUsuario(usuario.id);
    //         } else {
    //             await seguirUsuario(usuario.id);
    //         }
    //         setSiguiendo(!siguiendo);
    //     } catch (error) {
    //         alert("Hubo un error al actualizar el estado de seguimiento");
    //     }
    // };


    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <img src={usuario.avatar} className="modal-avatar" alt="avatar" />
                <h2>{usuario.nombre}</h2>
                {/* <p>@{usuario.username}</p> */}
                <p>{usuario.perfil}h us</p>
                <p>{usuario.seguidores} seguidores</p>
                <button
                    className={`follow-button ${siguiendo ? "siguiendo" : ""}`}
                    onClick={manejarClickSeguir}
                >
                    {siguiendo ? "Siguiendo" : "Seguir"}
                </button>
            </div>
        </div>
    );
};

export default ModalPerfilUsuario;
