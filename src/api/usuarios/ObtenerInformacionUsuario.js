const obtenerUsuario = async (userId, token) => {
    try {
        const response = await fetch(`https://dockerapps.pulzo.com/threads/api/usuarios/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        return { data }; // así se parece a axios
    } catch (error) {
        console.error("❌ Error al obtener información del usuario:", error);
        return null;
    }
};

export default obtenerUsuario;
