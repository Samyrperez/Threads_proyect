import React, { useState } from "react";
import "./ModalHilo.css";
import VerticalLine from "../../../icons/VerticalLine";
import ImageIcon from "../../../icons/ImageIcon";
import LocationIcon from "../../../icons/LocationIcon";

const ModalHilo = ({ avatar, onClose }) => {
    const [hilos, setHilos] = useState([
        { id: Date.now(), texto: "", imagen: null }
    ]);

    const handlePublicar = () => {
        const textos = hilos.map(h => h.texto.trim()).filter(Boolean);
        if (textos.length === 0) return;

        console.log("Publicando hilo:", textos);
        setHilos([{ id: Date.now(), texto: "" }]);
        onClose(); // Cerrar modal
    };
    const manejarImagen = (index, file) => {
        const nuevosHilos = [...hilos];
        nuevosHilos[index].imagen = URL.createObjectURL(file);
        setHilos(nuevosHilos);
    };
    const eliminarImagen = (index) => {
        const nuevosHilos = [...hilos];
        nuevosHilos[index].imagen = null;
        setHilos(nuevosHilos);
    };
    
    

    const añadirHilo = () => {
        setHilos(prev => [...prev, { id: Date.now(), texto: "" }]);
    };

    const eliminarUltimoHilo = () => {
        if (hilos.length > 1) {
            setHilos(prev => prev.slice(0, -1));
        }
    };

    const actualizarTexto = (index, nuevoTexto) => {
        const nuevosHilos = [...hilos];
        nuevosHilos[index].texto = nuevoTexto;
        setHilos(nuevosHilos);
    };

    const puedeAñadirHilo = hilos[0].texto.trim() !== "" || hilos[0].imagen;

    const obtenerUbicacion = (index) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const nuevosHilos = [...hilos];
                    nuevosHilos[index].ubicacion = { lat: latitude, lon: longitude };
                    setHilos(nuevosHilos);
                },
                (error) => {
                    console.error("Error obteniendo ubicación:", error);
                    alert("No se pudo obtener la ubicación");
                }
            );
        } else {
            alert("Tu navegador no soporta geolocalización");
        }
    };

    const eliminarUbicacion = (index) => {
        const nuevosHilos = [...hilos];
        nuevosHilos[index].ubicacion = null;
        setHilos(nuevosHilos);
    };
    
    

    return (
        <div className="modal-hilo">
            <div className="modal-contenido">
                <div className="modal-header">
                    <span className="modal-cancelar" onClick={onClose}>
                        Cancelar
                    </span>
                    <span className="modal-titulo">Nuevo hilo</span>
                    <span className="modal-opciones">⋯</span>
                </div>

                <div className="scroll-contenido">
                {hilos.map((hilo, index) => (
                    <div key={hilo.id} className="modal-body">
                        <div className="container-avatar">
                            <img src={avatar} alt="Avatar" className="avatar-modal" />
                            <VerticalLine className="vertical-line-dinamica" />
                            {/* {index !== hilos.length - 1 && (
                                
                            )} */}
                        </div>


                        <div className="contenido-hilo">
                            <div className="cabecera-hilo">
                                <span className="usuario">sammmperezz</span>
                                {index > 0 && (
                                    <button className="btn-cerrar-x" onClick={() => eliminarUltimoHilo()}>
                                        ×
                                    </button>
                                )}
                            </div>
                            <textarea
                                value={hilo.texto}
                                onChange={(e) => actualizarTexto(index, e.target.value)}
                                placeholder={index === 0 ? "¿Qué hay de nuevo?" : "Di algo más..."}
                                rows="3"
                            />
                            {hilo.imagen && (
                                <div className="preview-imagen">
                                    <img src={hilo.imagen} alt="Vista previa" />
                                    <button className="eliminar-imagen" onClick={() => eliminarImagen(index)}>✕</button>
                                </div>
                            )}
                            {hilo.ubicacion && (
                                <div className="ubicacion">
                                    📍 Ubicación añadida: {hilo.ubicacion.lat.toFixed(4)}, {hilo.ubicacion.lon.toFixed(4)}
                                    <button className="eliminar-ubicacion" onClick={() => eliminarUbicacion(index)}>✕</button>
                                </div>
                            )}




                            <div className="opciones-hilo">
                                <label className="opcion subir-imagen">
                                    <ImageIcon color="#444" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={(e) => {
                                            if (e.target.files[0]) {
                                                manejarImagen(index, e.target.files[0]);
                                            }
                                        }}
                                    />
                                </label>

                                <span className="opcion" onClick={() => obtenerUbicacion(index)}>
                                    <LocationIcon color="#444" />
                                </span>

                            </div>
                        </div>
                    </div>
                ))}

                </div>
                

                {/* Botón "Añadir al hilo" + Cancelar hilo */}
                <div className="container-anadir-hilo">
                    <div className="avatar-hilo">
                        <img src={avatar} alt="Avatar" className="avatar-modal-hilo" />
                    </div>
                    <div className="anadir-hilo-ancla">
                        <a
                            href="#"
                            className={`anadir-hilo ${!puedeAñadirHilo ? "deshabilitado" : ""}`}
                            onClick={(e) => {
                                e.preventDefault();
                                if (puedeAñadirHilo) {
                                    añadirHilo();
                                }
                            }}
                        >
                            Añadir al hilo
                        </a>
                        
                    </div>
                </div>

                <div className="modal-footer">
                    <p>Cualquiera puede responder y citar</p>
                    <button className="btn-publicar" onClick={handlePublicar}>
                        Publicar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalHilo;
