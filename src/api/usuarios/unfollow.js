const API_URL = "https://api.midominio.com"; // cambia esto por tu URL real

export const unfollow = async (idUsuarioADejarDeSeguir) => {
    try {
        const response = await fetch(`${API_URL}/usuarios/unfollow`, {
            method: "POST", // o DELETE según tu backend
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ dejarDeSeguirA: idUsuarioADejarDeSeguir }),
        });

        if (!response.ok) {
            throw new Error("No se pudo dejar de seguir al usuario");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en unfollow:", error);
        throw error;
    }
};
