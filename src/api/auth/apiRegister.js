const API_URL = "https://dockerapps.pulzo.com/threads/register"; // 

export async function registerUser({ name, email, password }) {
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
                
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al registrar usuario.");
        }
        console.log(data.message)

        return data; 
    } catch (error) {
        console.error("Error en apiRegister:", error);
        throw error;
    }
}
