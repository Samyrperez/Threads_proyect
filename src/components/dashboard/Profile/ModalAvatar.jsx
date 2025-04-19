// src/components/ModalAvatar.jsx
import React from "react";

import "../../dashboard/Profile/ModalAvatar.css"; // Asegúrate de que la ruta sea correcta
const ModalAvatar = ({ imageUrl, onClose }) => {
    return (
        <div className="modal-avatar-overlay" onClick={onClose}>
            <div className="modal-avatar-content" onClick={(e) => e.stopPropagation()}>
            <img
                    src={
                        imageUrl?.startsWith("data:") // Vista previa en base64 (cuando estás editando)
                            ? imageUrl
                            : imageUrl
                                ? `https://dockerapps.pulzo.com/threads${imageUrl}` // Ruta relativa del backend
                                : "/default-avatar.png" // Por si no hay avatar
                    }
                    alt="Avatar"
                    className="modal-avatar-image"
                />

                <button className="modal-avatar-close" onClick={onClose}>×</button>
            </div>
        </div>
    );
};

export default ModalAvatar;
