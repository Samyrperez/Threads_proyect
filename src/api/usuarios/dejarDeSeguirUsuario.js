

export const dejarDeSeguirUsuario = async (seguidorId, seguidoId, token, setSiguiendo) => {
    const confirmar = window.confirm("¿Estás seguro que deseas dejar de seguir a este usuario?");
    if (!confirmar) return;

    try {
        const response = await fetch("https://dockerapps.pulzo.com/threads/api/usuarios/dejar-de-seguir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                seguidor_id: seguidorId,
                seguido_id: seguidoId,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("👋 Dejaste de seguir al usuario:", data);
            setSiguiendo(false);
        } else {
            console.error("❌ Error al dejar de seguir:", data.message);
        }
    } catch (error) {
        console.error("❌ Error en la petición de dejar de seguir:", error);
    }
};