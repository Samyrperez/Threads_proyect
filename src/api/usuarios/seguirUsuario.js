const API_URL = "http://localhost:3000/api"; // Ajusta según tu entorno

export const seguirUsuario = async (idUsuarioActual, idUsuarioASeguir) => {
    try {
        const response = await fetch(`${API_URL}/usuarios/${idUsuarioActual}/seguir`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ seguirA: idUsuarioASeguir }),
        });

        if (!response.ok) {
            throw new Error("Error al seguir al usuario");
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Error al intentar seguir al usuario:", error);
        throw error;
    }
};


// Con backend
// const API_URL = "http://localhost:3000/api"; // Cambia según tu entorno
// export const seguirUsuario = async (idUsuarioASeguir) => {
//     try {
//         const response = await fetch(`${API_URL}/usuarios/seguir`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${localStorage.getItem("token")}`, // o como guardes el token
//             },
//             body: JSON.stringify({ seguirA: idUsuarioASeguir }),
//         });

//         if (!response.ok) {
//             throw new Error("No se pudo seguir al usuario");
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("Error en seguirUsuario:", error);
//         throw error;
//     }
// };
