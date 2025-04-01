import { useEffect, useState } from "react";
import "../css/styles.css";
import Footer from "../components/Footer";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showLogo, setShowLogo] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setShowLogo(false); // Oculta el logo después de 2 segundos
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        console.log("Intentando registrarse con:", username, email, password);
        // Aquí puedes manejar la lógica de registro cuando conectes el backend
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
                            placeholder="Nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
