import React, { useState } from "react";
import "./Publicar.css"; // Asegúrate de tener un archivo CSS para estilos



const Publicar = ({avatar}) => {
    const [hilo, setHilo] = useState("");

    const handlePublicar = () => {
        if (hilo.trim() === "") return;

        // Acá luego harás una petición a la base de datos o backend
        console.log("Publicando hilo:", hilo);

        setHilo(""); // Limpiar el textarea después de publicar
    };

    return (
        <div className="publicar-container">
            <div className="publicar-header">
                <img
                    src={avatar}
                    alt="Avatar"
                    className="avatar-publicar"
                />
                <input
                    type="text"
                    placeholder="¿Qué hay de nuevo?"
                    value={hilo}
                    onChange={(e) => setHilo(e.target.value)}
                    className="input-publicar"
                />
                <button className="btn-publicar" onClick={handlePublicar}>
                    Publicar
                </button>
            </div>
        </div>
    );
};

export default Publicar;
