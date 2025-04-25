

const obtenerRespuestas = async ({ userId, token }) => {
    try {
        const response = await fetch(`https://dockerapps.pulzo.com/threads/api/comentarios/usuario/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (data?.data) {
            return data.data;
        } else {
            console.error("❌ No se pudieron obtener las respuestas del usuario");
            return [];
        }
    } catch (error) {
        console.error("❌ Error al obtener las respuestas:", error);
        return [];
    }
};

export default obtenerRespuestas;