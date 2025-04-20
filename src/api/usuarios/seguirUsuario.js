// src/api/usuarios/seguirUsuario.js
export const seguirUsuario = async (seguidor_id, seguido_id) => {
    try {
        const response = await fetch(`https://dockerapps.pulzo.com/threads/api/usuarios/seguir?=${seguido_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ seguidor_id, seguido_id }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al seguir al usuario:", error);
        return { code: 500, message: "Error de red o del servidor" };
    }
};
