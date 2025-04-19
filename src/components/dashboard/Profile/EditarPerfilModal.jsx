import React, { useState, useEffect, useRef } from "react";
import "./EditarPerfilModal.css";
import { subirAvatar } from "../../../api/perfil/subirAvatar"; // Importa la función para subir el avatar

const EditarPerfilModal = ({ isOpen, onClose, user, onSave }) => {
    const [bio, setBio] = useState("");
    // const [link, setLink] = useState("");
    const [avatar, setAvatar] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const modalRef = useRef(null);


    useEffect(() => {
        setBio(user.description || "");
        setAvatar(user.avatar || "");
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file); // lo guardás para subirlo después
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result); // para la vista previa
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSave = async () => {
        if (!bio.trim()) {
            alert("La presentación no puede estar vacía.");
            return;
        }
    
        try {
            let avatarPath = user.avatar;
    
            if (selectedFile) {
                avatarPath = await subirAvatar(selectedFile);
                console.log("Avatar recibido:", avatarPath);
                setAvatar(avatarPath);
            }
            console.log(avatarPath);
    
            const datosActualizados = {
                id: user.id,
                name: user.name,
                // phone: user.phone,
                avatar: avatarPath,
                description: bio,
            };
            console.log("📝 Datos enviados a editarPerfil:", datosActualizados);

    
            await onSave(datosActualizados);
        } catch (err) {
            console.error(err);
            alert("❌ Error al guardar los cambios.");
        }
    };
    
    

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-editar-content" ref={modalRef}>
                <div className="modal-editar-header">
                    <button onClick={onClose} className="close-modal-editar-btn">✕</button>
                </div>

                <div className="user-info-section">
                    <div className="modal-editar-user-info">
                        <h3>Nombre</h3>
                            <h3 className="user-name"><strong>{user.name}</strong> 
                            {/* (@{user.username}) */}
                        </h3>

                    </div>

                    <div className="modal-editar-avatar">
                        <label className="avatar-label" title="Haz clic para cambiar tu foto">
                            <img
                                src={
                                    avatar?.startsWith("data:")
                                        ? avatar // base64 preview
                                        : avatar
                                            ? `https://dockerapps.pulzo.com/threads${avatar}`
                                            : "/default-avatar.png"
                                }
                                alt="Avatar"
                                className="avatar"
                            />

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

                    {/* <label>Enlace</label>
                    <input
                        className="modal-editar-body-input"
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Añade un enlace"
                    /> */}
                </div>

                <div className="modal-editar-footer">
                    <button className="save-btn" onClick={handleSave}>Listo</button>
                </div>
            </div>
        </div>
    );
};

export default EditarPerfilModal;
