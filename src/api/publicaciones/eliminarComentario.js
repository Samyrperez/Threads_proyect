// api/publicaciones/eliminarComentario.js
export const eliminarComentario = async (usuario_id, comentario_id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://dockerapps.pulzo.com/threads/api/comentarios", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ usuario_id, comentario_id })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Error eliminando el comentario:", error);
        return null;
    }
};
