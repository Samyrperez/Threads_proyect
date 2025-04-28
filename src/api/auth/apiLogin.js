const API_URL = "https://dockerapps.pulzo.com/threads/login"; // 


export async function loginUser(credentials) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });

    const data = await response.json();

    console.log("Respuesta del login:", data);

    if (!response.ok) {
        
        throw new Error(data.message || JSON.stringify(data) || "Error al iniciar sesión.");
    }

    return data;
}

