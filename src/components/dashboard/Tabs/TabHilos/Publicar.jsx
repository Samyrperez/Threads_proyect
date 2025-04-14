import React, { useState } from "react";
import "./Publicar.css";
import ModalHilo from "./ModalHilo"; // Nuevo componente

const Publicar = ({ avatar }) => {
    const [modalAbierto, setModalAbierto] = useState(false);

    return (
        <>
            <div className="publicar-container">
                <div className="publicar-header">
                    <img src={avatar} alt="Avatar" className="avatar-publicar" />
                    <input
                        type="text"
                        placeholder="¿Qué hay de nuevo?"
                        className="input-publicar"
                        onClick={() => setModalAbierto(true)}
                        readOnly
                    />
                    <button className="publicar">Publicar</button>
                </div>
            </div>

            {modalAbierto && (
                <ModalHilo
                
                    avatar={avatar}
                    onClose={() => setModalAbierto(false)}
                />
            )}
        </>
    );
};

export default Publicar;
