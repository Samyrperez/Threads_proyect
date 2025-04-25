import React from "react";

const ModalHeader = ({ onClose,  esRespuesta }) => (
    <div className="modal-header">
        <span className="modal-cancelar" onClick={onClose}>
            Cancelar
        </span>
        <span className="modal-titulo">{esRespuesta ? "Responder" : "Nuevo hilo"}</span>
        <span className="modal-opciones">⋯</span>
    </div>
);

export default ModalHeader;
