const API_URL = "http://localhost:3000/api";

export const editarPerfil = async (perfilActualizado) => {
    try {
        const response = await fetch(`${API_URL}/perfil`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(perfilActualizado),
        });

        if (!response.ok) {
            throw new Error("Error al editar el perfil");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en editarPerfil:", error);
        throw error;
    }
};



// import { editarPerfil } from "@/api/perfil";

// const handleGuardarCambios = async (datosActualizados) => {
//     try {
//         const usuarioEditado = await editarPerfil(datosActualizados);
//         console.log("✅ Perfil actualizado:", usuarioEditado);
//         // Aquí puedes actualizar el estado global o local
//     } catch (error) {
//         console.error("❌ Error al guardar los cambios:", error);
//     }
// };
