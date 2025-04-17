// Esta función obtiene todas las publicaciones desde el backend (simulado por ahora).
const API_URL = "https://api.midominio.com/publicaciones"; // Simulación

export const obtenerPublicaciones = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error al obtener publicaciones");
        }

        const publicaciones = await response.json();
        return publicaciones;
    } catch (error) {
        console.error("Error en obtenerPublicaciones:", error);
        throw error;
    }
};
