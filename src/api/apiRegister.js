// src/api/apiRegister.js

/**
 * Función para registrar un nuevo usuario en el sistema
 * @param {Object} userData - Los datos del usuario: { username, email, password }
 * @returns {Promise<Object>} - Datos del usuario registrado
 */
export const registerUser = async ({ username, email, password }) => {
    // 👉 Simulación temporal para pruebas
    console.log("Simulación de registro con:", { username, email, password });

    // Puedes simular un retraso si quieres que parezca real:
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulación de respuesta exitosa
    return {
        usuario: {
            id: "123456",
            username,
            email,
            name: "Nombre de prueba"
        },
        token: "token-ficticio-123"
    };

    // 🛠️ Cuando conectes al backend, usa este bloque:

    /*
    try {
        const response = await fetch("https://tudominio.com/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensaje || "Error al registrar el usuario");
        }

        return data;

    } catch (error) {
        console.error("Error en el registro:", error);
        throw error;
    }
    */
};
