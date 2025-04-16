import React from "react";

const ModalHeader = ({ onClose }) => (
    <div className="modal-header">
        <span className="modal-cancelar" onClick={onClose}>
            Cancelar
        </span>
        <span className="modal-titulo">Nuevo hilo</span>
        <span className="modal-opciones">⋯</span>
    </div>
);

export default ModalHeader;
