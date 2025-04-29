import React from "react";

const AddHiloButton = ({ avatar, puedeAñadir, añadirHilo }) => (
    <div className="container-anadir-hilo">
        <div className="avatar-hilo">
            <img src={avatar} alt="Avatar" className="avatar-modal-hilo" />
        </div>
        <div className="anadir-hilo-ancla">
            <a
                href="#"
                className={`anadir-hilo ${!puedeAñadir ? "deshabilitado" : ""}`}
                onClick={(e) => {
                    e.preventDefault();
                    if (puedeAñadir) añadirHilo();
                }}
            >
                Añadir al hilo
            </a>
        </div>
    </div>
);

export default AddHiloButton;
