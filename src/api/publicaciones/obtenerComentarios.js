export const obtenerComentarios = async () => {
    try {
        const token = localStorage.getItem('token'); // O donde guardes tu token
        const response = await fetch('https://dockerapps.pulzo.com/threads/api/comentarios', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error al obtener comentarios: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('❌ Error en obtenerComentarios.js:', error);
        return [];
    }
};
