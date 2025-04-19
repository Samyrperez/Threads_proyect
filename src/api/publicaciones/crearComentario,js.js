export const crearComentario = async (usuarioId, contenido) => {
    try {
        const token = localStorage.getItem("token");

        console.log("Este es el contenido: ",contenido);
        const response = await fetch("https://dockerapps.pulzo.com/threads/api/comentarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                usuario_id: usuarioId,
                contenido: contenido,
            }),

        });


        if (!response.ok) {
            const errorData = await response.json();
            console.error("🛑 Error recibido:", errorData);
            throw new Error(errorData.error || "Error al crear el comentario");
        }

        const data = await response.json();
        console.log("✅ Comentario creado:", data);
        return data;
    } catch (error) {
        console.error("❌ Error al crear el comentario:", error);
        throw error;
    }
};
