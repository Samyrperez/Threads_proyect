const API_URL = "https://tu-api.com/api/register"; // 

export async function registerUser({ name, email, password /*, username */ }) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                // username // 👉 Descomenta si el frontend genera el username
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al registrar usuario.");
        }

        return data; // Esperamos que contenga { usuario: { ... } }
    } catch (error) {
        console.error("Error en apiRegister:", error);
        throw error;
    }
}
