import "./tabRespuesta.css";

const TabRespuestas = ({ respuestas, publicaciones }) => {
    if (!Array.isArray(respuestas) || respuestas.length === 0) {
        return <p>No has respondido a ninguna publicación todavía.</p>;
    }

    if (!Array.isArray(publicaciones) || publicaciones.length === 0) {
        return <p>No hay publicaciones para mostrar.</p>;
    }

    console.log("Respuestas:", respuestas);
    console.log("Publicaciones:", publicaciones);

    return (
        <div className="tab-respuestas">
            {respuestas.map((respuesta, index) => {
                const {
                    id: respuestaId,
                    usuario: respuestaUsuario,
                    contenido: respuestaContenido,
                    fecha_creacion: respuestaFechaCreacion,
                    comentario_padre,
                } = respuesta;

                if (!comentario_padre) {
                    console.log("Comentario padre no encontrado en respuesta:", respuesta);
                    return null;
                }

                const {
                    id: Id,
                    usuario: publicacionUsuario,
                    // contenido: publicacionContenido,
                    fecha_creacion: publicacionFechaCreacion,
                } = comentario_padre;

                return (
                    <div key={respuestaId || index} className="respuesta-item-profile">

                        {/* Publicación original */}
                        <div className="publicacion-original-profile">
                            <p className="publicacion-autor-profile">{publicacionUsuario?.username}</p>
                            <p className="publicacion-fecha-profile">
                                {new Date(publicacionFechaCreacion).toLocaleString()}
                            </p>
                            <p
                                // className="publicacion-contenido-profile"
                                // dangerouslySetInnerHTML={{
                                //     __html: publicacionContenido,
                                // }}
                            ></p>
                        </div>

                        {/* Respuesta usuario */}
                        <div className="respuesta-profile">
                            <p className="respuesta-autor-profile">{respuestaUsuario?.username}</p>
                            <p className="respuesta-fecha-profile">
                                {new Date(respuestaFechaCreacion).toLocaleString()}
                            </p>
                            <p className="respuesta-texto-profile">{respuestaContenido}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TabRespuestas;
