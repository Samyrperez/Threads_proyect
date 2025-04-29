// TareasPerfil.jsx
import { useState } from "react";
import React from "react";
import  {IconoCrearHilo} from "../../../icons/IconoCrearHilo";
import {IconoCheck} from "../../../icons/IconoCheck";
import "./TareasPerfil.css";
import ModalHilo from "./ModalHilo";



const tareas = [
    {
        titulo: "Crear hilo",
        descripcion: "Di lo que estás pensando o comparte un momento destacado reciente.",
        estado: "Crear",
        icono: <IconoCrearHilo />,
    },
    {
        titulo: "Añadir foto del perfil",
        descripcion: "Facilita que los demás te reconozcan.",
        estado: "Listo",
        icono: <IconoCheck />,
    },
    {
        titulo: "Añadir biografia",
        descripcion: "Facilita que los demás te reconozcan.",
        estado: "Listo",
        icono: <IconoCheck />,
    }
];



const TareasPerfil = () => {

    const [mostrarModal, setMostrarModal] = useState(false);

    const handleCrearClick = () => {
        setMostrarModal(true);
    };

    return (
        <div className="tareas-perfil">
            <div className="tareas-header">
                <span>Finaliza tu perfil</span>
            </div>

            <div className="tareas-lista">
                {tareas.map((tarea, index) => (
                    <div key={index} className="tarea-card">
                        <div className="tarea-icono">{tarea.icono}</div>
                        <h4>{tarea.titulo}</h4>
                        <p>{tarea.descripcion}</p>
                        {tarea.estado === "Crear" ? (
                            <button className="btn-tarea crear" onClick={handleCrearClick}>
                                Crear
                            </button>
                        ) : (
                            <button className="btn-tarea listo" disabled>
                                Listo
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {mostrarModal && (
                <ModalHilo
                    onClose={() => setMostrarModal(false)}
                    setMostrarModal={setMostrarModal}
                    avatar="https://images.imagenmia.com/model_version/bbfea91410ef7994cfefde4a33e032f3aebf7b90dda683f7fa32ea2685d2e7bb/1723819204347-output.jpg"
                />
            )}
        </div>
    );
};

export default TareasPerfil;
