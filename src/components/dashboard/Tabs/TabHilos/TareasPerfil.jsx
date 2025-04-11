// TareasPerfil.jsx
import React from "react";
import  {IconoCrearHilo} from "../../../icons/IconoCrearHilo";
import {IconoCheck} from "../../../icons/IconoCheck";
import "./TareasPerfil.css";



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
        titulo: "Añadir foto del perfil",
        descripcion: "Facilita que los demás te reconozcan.",
        estado: "Listo",
        icono: <IconoCheck />,
    }
];

const TareasPerfil = () => {
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
                        <button
                            className={`btn-tarea ${tarea.estado === "Crear" ? "crear" : "listo"}`}
                        >
                            {tarea.estado}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TareasPerfil;
