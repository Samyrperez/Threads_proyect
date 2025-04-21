import React, { useState } from "react";
import "./ModalPerfilUsuario.css";

const ModalPerfilUsuario = ({ usuarioASeguir, onClose }) => {
    const [siguiendo, setSiguiendo] = useState(false);

    const seguidorId = parseInt(localStorage.getItem("userId"), 10); // ✅ convertir a número
    const token = localStorage.getItem("token");

    if (!usuarioASeguir) return null;
    if (!seguidorId || !token) {
        console.error("⛔ No hay usuario autenticado o token");
        return null;
    }

    const usuarioASeguirId = usuarioASeguir.id;

    // const manejarClickSeguir = async () => {
    //     try {
    //         console.log("📤 Enviando:", {
    //             seguidor_id: seguidorId,
    //             seguido_id: usuarioASeguirId,
    //         });

    //         const response = await fetch(`https://dockerapps.pulzo.com/threads/api/usuarios/seguir`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`,
    //             },
    //             body: JSON.stringify({
    //                 seguidor_id: seguidorId,
    //                 seguido_id: usuarioASeguirId,
    //             }),
    //         });

    //         const data = await response.json();

    //         if (response.ok) {
    //             console.log("✅ Usuario seguido con éxito:", data);
    //             setSiguiendo(prev => !prev); // Solo cambia si fue exitoso
    //         } else {
    //             console.error("❌ Error desde el backend:", data.message);
    //         }
    //     } catch (error) {
    //         console.error("❌ Error al seguir al usuario:", error);
    //     }
    // };
    const manejarClickSeguir = async () => {
        if (siguiendo) {
            const confirmar = window.confirm("¿Estás seguro que deseas dejar de seguir a este usuario?");
            if (!confirmar) return;
    
            try {
                const response = await fetch("https://dockerapps.pulzo.com/threads/api/usuarios/dejar-de-seguir", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        seguidor_id: seguidorId,
                        seguido_id: usuarioASeguirId,
                    }),
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    console.log("👋 Dejaste de seguir al usuario:", data);
                    setSiguiendo(false);
                } else {
                    console.error("❌ Error al dejar de seguir:", data.message);
                }
            } catch (error) {
                console.error("❌ Error en la petición de dejar de seguir:", error);
            }
    
        } else {
            // Acción de seguir
            try {
                const response = await fetch("https://dockerapps.pulzo.com/threads/api/usuarios/seguir", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        seguidor_id: seguidorId,
                        seguido_id: usuarioASeguirId,
                    }),
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    console.log("✅ Ahora sigues al usuario:", data);
                    setSiguiendo(true);
                } else {
                    console.error("❌ Error al seguir al usuario:", data.message);
                }
            } catch (error) {
                console.error("❌ Error en la petición de seguir:", error);
            }
        }
    };
    



    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <img src={usuarioASeguir.avatar} className="modal-avatar" alt="avatar" />
                <h2>{usuarioASeguir.nombre}</h2>
                <p>{usuarioASeguir.perfil}</p>
                <p>{usuarioASeguir.seguidores} seguidores</p>
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
