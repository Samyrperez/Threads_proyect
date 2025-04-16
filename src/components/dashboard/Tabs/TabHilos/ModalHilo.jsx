// src/components/Tabs/TabHilos/ModalHilo.jsx
import React, { useState } from "react";
import "./ModalHilo.css";
import ModalHeader from "./CompModalHilo/ModalHeader";
import HiloItem from "./CompModalHilo/HiloItem";
import AñadirHiloFooter from "./CompModalHilo/AñadirHiloFooter";
import ModalFooter from "./CompModalHilo/ModalFooter";


const ModalHilo = ({ avatar, onClose }) => {
    const [hilos, setHilos] = useState([{ id: Date.now(), texto: "", imagen: null }]);

    const handlePublicar = () => {
        const textos = hilos.map(h => h.texto.trim()).filter(Boolean);
        if (textos.length === 0) return;
        console.log("Publicando hilo:", textos);
        setHilos([{ id: Date.now(), texto: "" }]);
        onClose();
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
