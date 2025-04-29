
import React from "react";

import "../../dashboard/Profile/ModalAvatar.css"; 
const ModalAvatar = ({ imageUrl, onClose }) => {
    return (
        <div className="modal-avatar-overlay" onClick={onClose}>
            <div className="modal-avatar-content" onClick={(e) => e.stopPropagation()}>
            <img
                    src={
                        imageUrl?.startsWith("data:") 
                            ? imageUrl
                            : imageUrl
                                ? `https://dockerapps.pulzo.com/threads${imageUrl}` 
                                : "/default-avatar.png" 
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
