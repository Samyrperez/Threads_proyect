import React from "react";
import "./EditarPerfilModal.css"; // ✅ correcto


const EditarPerfilModal = ({ isOpen, onClose, user, onSave }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Editar perfil</h2>
                    <button onClick={onClose} className="close-btn">✕</button>
                </div>

                <div className="modal-body">
                    <div className="user-info">
                        <img src={user.avatar} alt="Avatar" className="avatar" />
                        <p><strong>{user.name}</strong> (@{user.username})</p>
                    </div>

                    <label>Presentación</label>
                    <textarea
                        defaultValue={user.bio}
                        placeholder="Escribe algo sobre ti..."
                    />

                    <label>Enlace</label>
                    <input
                        type="text"
                        placeholder="Añade un enlace"
                        defaultValue={user.link || ""}
                    />
                </div>

                <div className="modal-footer">
                    <button className="save-btn" onClick={onSave}>Guardar</button>
                </div>
            </div>
        </div>
    );
};

export default EditarPerfilModal;
