import React from "react";
import Publicar from "./TabHilos/Publicar";
import TareasPerfil from "../Tabs/TabHilos/TareasPerfil"; //
import Publicacion from "../Home/Publicacion";


const TabHilos = ({ avatar, publicaciones }) => {
    console.log("👀 TabHilos cargado con publicaciones:", publicaciones);
    

    return (
        <div className="tab-hilos">
            <p>Tus Hilos 🔁</p>

            <Publicar avatar={avatar} />
            <TareasPerfil />

            {Array.isArray(publicaciones) && publicaciones.map((pub) => (
                <Publicacion
                    key={pub.comentario.id}
                    id={pub.comentario.id}
                    usuario={pub.comentario.usuario}
                    tiempo={pub.comentario.fecha_creacion}
                    texto={pub.comentario.contenido}
                    imagen={null}
                    likes={pub.comentario.me_gusta_total}
                    respuestas={pub.respuestas?.length || 0}
                    compartidos={0}
                    guardados={0}
                    comentarios={pub.respuestas || []}
                />
            ))}
        </div>
    );
};


export default TabHilos;

