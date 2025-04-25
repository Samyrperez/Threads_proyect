export const obtenerSeguidores = async (usuarioId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `https://dockerapps.pulzo.com/threads/api/usuarios/${usuarioId}/seguidores`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Error al obtener seguidores: ${response.status}`);
        }

        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error("❌ Error en obtenerSeguidores:", error);
        return [];
    }
};
