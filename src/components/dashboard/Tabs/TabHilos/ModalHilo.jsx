// src/components/Tabs/TabHilos/ModalHilo.jsx
import React, { useState, useEffect } from "react";
import "./ModalHilo.css";
import ModalHeader from "./CompModalHilo/ModalHeader";
import HiloItem from "./CompModalHilo/HiloItem";
import AñadirHiloFooter from "./CompModalHilo/AñadirHiloFooter";
import ModalFooter from "./CompModalHilo/ModalFooter";
import { obtenerPerfil } from "../../../../api/perfil/obtenerPerfil"; 
import { crearComentario } from "../../../../api/publicaciones/crearComentario,js"; // <-- corregí si la coma no es parte real del nombre

const ModalHilo = ({ onClose }) => {
    const [hilos, setHilos] = useState([{ id: Date.now(), texto: "", imagen: null }]);
    const [avatar, setAvatar] = useState(null);
    const [usuarioId, setUsuarioId] = useState(null); // nuevo

    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) return;

                const perfil = await obtenerPerfil(userId);

                if (perfil?.avatar) {
                    setAvatar(`https://dockerapps.pulzo.com/threads${perfil.avatar}`);
                } else {
                    setAvatar("/default-avatar.png");
                }

                setUsuarioId(perfil.id); // 👈 guardamos el id del usuario
            } catch (err) {
                console.error("❌ Error al cargar perfil en ModalHilo:", err);
                setAvatar("/default-avatar.png");
            }
        };

        cargarPerfil();
    }, []);

    const handlePublicar = async () => {
        const primerHilo = hilos[0];
        const texto = primerHilo.texto.trim();
        const imagen = primerHilo.imagen;
    
        if ((!texto && !imagen) || !usuarioId) return;
    
        let contenido = texto;
    
        // Si hay imagen, la incluimos como <img src="..."> en el contenido
        if (imagen) {
            contenido += `<br><img src="${imagen}" alt="imagen adjunta" style="max-width: 100%"/>`;
        }
    
        try {
            console.log("📤 Enviando comentario con contenido:", contenido);
    
            await crearComentario(usuarioId, contenido);
    
            setHilos([{ id: Date.now(), texto: "", imagen: null }]);
            onClose();
        } catch (err) {
            console.error("❌ Error al publicar comentario:", err);
            alert("Hubo un error al publicar tu comentario.");
        }
    };
    

    const actualizarHilo = (index, campo, valor) => {
        const nuevosHilos = [...hilos];
        nuevosHilos[index][campo] = valor;
        setHilos(nuevosHilos);
    };

    return (
        <div className="modal-hilo">
            <div className="modal-contenido">
                <ModalHeader onClose={onClose} />

                <div className="scroll-contenido">
                    {hilos.map((hilo, index) => (
                        <HiloItem
                            key={hilo.id}
                            index={index}
                            hilo={hilo}
                            hilos={hilos}
                            setHilos={setHilos}
                            avatar={avatar}
                            actualizarHilo={actualizarHilo}
                            eliminarUltimoHilo={() => {
                                if (hilos.length > 1) {
                                    setHilos(prev => prev.slice(0, -1));
                                }
                            }}
                        />
                    ))}
                </div>

                <AñadirHiloFooter
                    avatar={avatar}
                    puedeAñadir={hilos[0].texto.trim() !== "" || hilos[0].imagen}
                    onAñadir={() => setHilos(prev => [...prev, { id: Date.now(), texto: "", imagen: null, ubicacion: null }])}
                />

                <ModalFooter onPublicar={handlePublicar} />
            </div>
        </div>
    );
};

export default ModalHilo;
