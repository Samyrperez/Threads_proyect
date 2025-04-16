import React, { useState, useEffect, useRef } from "react";
import "./EditarPerfilModal.css";

const EditarPerfilModal = ({ isOpen, onClose, user, onSave }) => {
    const [bio, setBio] = useState(user.bio || "");
    const [link, setLink] = useState(user.link || "");
    const [avatar, setAvatar] = useState(user.avatar || "");
    // const [showDropdown, setShowDropdown] = useState(false);

    const modalRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("📷 Imagen seleccionada:", file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log("✅ Imagen cargada en base64");
            setAvatar(reader.result); // Esto debe actualizar el avatar
            };
            reader.readAsDataURL(file);
        }else {
            console.log("❌ No se seleccionó ningún archivo");
        }
    };
    
    // Actualiza los valores si el usuario cambia
    useEffect(() => {
        setBio(user.bio || "");
        setLink(user.link || "");
    }, [user]);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        const handleEscapeKey = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [onClose]);

    if (!isOpen) return null;

    const handleSave = () => {
        // ✅ Validación simple
        if (!bio.trim()) {
            alert("La presentación no puede estar vacía.");
            return;
        }

        onSave({ ...user, bio, link, avatar });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-editar-content" ref={modalRef}>
                <div className="modal-editar-header">
                    <button onClick={onClose} className="close-modal-editar-btn">✕</button>
                </div>

                <div className="user-info-section">
                    <div className="modal-editar-user-info">
                        <h3>Nombre</h3>
                        <h3 className="user-name"><strong>{user.name}</strong> (@{user.username})</h3>
                    </div>

                    <div className="modal-editar-avatar">
                        <label className="avatar-label" title="Haz clic para cambiar tu foto">
                            <img src={avatar} alt="Avatar" className="avatar" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                        </label>
                    </div>


                </div>

                <div className="modal-editar-body">
                    <h3>Presentación</h3>
                    <textarea
                        className="modal-editar-body-textarea"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Escribe algo sobre ti..."
                    />

                    <label>Enlace</label>
                    <input
                        className="modal-editar-body-input"
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Añade un enlace"
                    />
                </div>

                <div className="modal-editar-footer">
                    <button className="save-btn" onClick={handleSave}>Listo</button>
                </div>
            </div>
        </div>
    );
};

export default EditarPerfilModal;
