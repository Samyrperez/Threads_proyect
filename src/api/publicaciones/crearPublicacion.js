


const API_URL = "http://localhost:3000/api";

export const crearPublicacion = async (publicacion) => {
    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(publicacion),
        });

        if (!response.ok) {
            throw new Error("Error al crear la publicación");
        }

        return await response.json();
    } catch (error) {
        console.error("Error al enviar la publicación:", error);
        throw error;
    }
};


// src/api/publicaciones/crearPublicacion.js
// Función: crearPublicacion
// Esta función se encarga de enviar los datos de una nueva publicación (post o hilo) al backend (API).
// Recibe un objeto `datos` con el contenido del post, como texto, imagen, etc.
// Utiliza fetch para hacer una solicitud POST simulando que tenemos una API REST.