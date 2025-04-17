const API_URL = "https://tu-api.com/api/login"; // 


export async function loginUser({ email, password }) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al iniciar sesión.");
        }

        return data; 
        // Esperamos que el backend responda con algo así como:
        // {
        //   usuario: { id, name, email, username, ... },
        //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
        // }
    } catch (error) {
        console.error("Error en apiLogin:", error);
        throw error;
    }
}
