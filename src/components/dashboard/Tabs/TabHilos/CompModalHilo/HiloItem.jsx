import React from "react";
import VerticalLine from "../../../../icons/VerticalLine";
import ImageIcon from "../../../../icons/ImageIcon";
import LocationIcon from "../../../../icons/LocationIcon";

const HiloItem = ({ index, hilo, avatar, actualizarHilo, eliminarUltimoHilo }) => {
    const manejarImagen = (file) => {
        actualizarHilo(index, "imagen", URL.createObjectURL(file));
    };

    const obtenerUbicacion = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    actualizarHilo(index, "ubicacion", { lat: latitude, lon: longitude });
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
    

    return (
        <div className="modal-body">
            <div className="container-avatar">
                <img src={avatar} alt="Avatar" className="avatar-modal" />
                <VerticalLine className="vertical-line-dinamica" />
            </div>

            <div className="contenido-hilo">
                <div className="cabecera-hilo">
                    <span className="usuario">sammmperezz</span>
                    {index > 0 && (
                        <button className="btn-cerrar-x" onClick={eliminarUltimoHilo}>×</button>
                    )}
                </div>

                <textarea
                    value={hilo.texto}
                    onChange={(e) => actualizarHilo(index, "texto", e.target.value)}
                    placeholder={index === 0 ? "¿Qué hay de nuevo?" : "Di algo más..."}
                    rows="3"
                />

                {hilo.imagen && (
                    <div className="preview-imagen">
                        <img src={hilo.imagen} alt="Vista previa" />
                        <button className="eliminar-imagen" onClick={() => actualizarHilo(index, "imagen", null)}>✕</button>
                    </div>
                )}

                {hilo.ubicacion && (
                    <div className="ubicacion">
                        📍 Ubicación añadida: {hilo.ubicacion.lat.toFixed(4)}, {hilo.ubicacion.lon.toFixed(4)}
                        <button className="eliminar-ubicacion" onClick={() => actualizarHilo(index, "ubicacion", null)}>✕</button>
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
                                    manejarImagen(e.target.files[0]);
                                }
                            }}
                        />
                    </label>
                    <span className="opcion" onClick={obtenerUbicacion}>
                        <LocationIcon color="#444" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default HiloItem;
