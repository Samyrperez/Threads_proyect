import { useEffect, useState } from "react";
import "../css/styles.css";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth/apiRegister";
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showLogo, setShowLogo] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
           setShowLogo(false); 
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        // Validación
        if (!name || !email || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        try {
            const data = await registerUser({ name, email, password });

            console.log("Respuesta de la API:", data);

            if (data.user) {
                localStorage.setItem("usuario", JSON.stringify(data.user));
                localStorage.setItem("token", data.user.token);
            }

            // Redirigimos al login
            navigate("/login");
        } catch (err) {
            console.error("Error en el registro:", err);
            setError(err.message || "Ocurrió un error al registrarse.");
        }
    };

    return (
        <div className="page-container">
            {showLogo && (
                <div className="overlay" onClick={() => setShowLogo(false)}>
                    <img
                        src="https://images.seeklogo.com/logo-png/48/2/threads-logo-png_seeklogo-489791.png"
                        alt="Logo Threads"
                        className="center-logo"
                    />
                </div>
            )}
            <div className="register-container">
                <div className="register-box">
                    <img
                        src="https://images.seeklogo.com/logo-png/48/2/threads-logo-png_seeklogo-489791.png"
                        alt="Logo Threads"
                        className="logo-threads"
                    />
                    <h2>Registrarse en Threads</h2>
                    {error && <p className="error-text">{error}</p>}
                    <form onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-field"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            required
                        />
                        <button type="submit" className="register-button">
                            Registrarse
                        </button>
                    </form>
                    <p className="login-text">
                        ¿Ya tienes cuenta? <a href="/login" className="login-link">Inicia sesión</a>
                    </p>
                </div>
            </div>
            <div id="footer">
                <Footer />
            </div>
        </div>
    );
};

export default Register;
