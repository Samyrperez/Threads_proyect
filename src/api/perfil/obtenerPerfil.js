const API_URL = "http://localhost:3000/api"; // Cambia si usas otro dominio o puerto

export const obtenerPerfil = async () => {
    try {
        const response = await fetch(`${API_URL}/perfil`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`, // Si usas autenticación
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener el perfil del usuario");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en obtenerPerfil:", error);
        throw error;
    }
};
