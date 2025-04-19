export const editarPerfil = async (datosActualizados) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token no encontrado. Por favor, iniciá sesión.");
        }

        const response = await fetch("https://dockerapps.pulzo.com/threads/api/usuarios/perfil", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(datosActualizados),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error al actualizar el perfil");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en editarPerfil:", error);
        throw error;
    }
};


