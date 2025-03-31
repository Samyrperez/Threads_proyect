import { useState } from "react";
import { Footer } from "../components/Footer";
import "../css/styles.css"; // Importa el archivo CSS

const Login = () => {
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        setError("");

        console.log("Intentando iniciar sesión con:", input, password);

        // Aquí puedes manejar la autenticación cuando integres el backend
    } 

    return (
        <div className="page-container">
            <div className="login-container">
                <div className="login-box">
                    <img
                        src="https://images.seeklogo.com/logo-png/48/2/threads-logo-png_seeklogo-489791.png"
                        alt="Logo Threads"
                        className="logo-threads"
                    />
                    <h2>Inicia sesión</h2>
                    {error && <p className="error-text">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Nombre de usuario, teléfono o correo electronico"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
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
                        <button type="submit" className="login-button">
                            Iniciar sesión
                        </button>
                    </form>
                    <p className="register-text">
                        ¿No tienes cuenta? <a href="/register" className="register-link">Regístrate</a>
                    </p>
                </div>
                <div className="goToInstagram">
                    <button className="button-instagram">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                            alt="Logo Instagram"
                            className="logo-instagram"
                        />
                        <p>Ir a Instagram  </p>
                    </button>
                </div>
                <div className="footer">
                    <Footer />
                </div>
                
            </div>
        </div>
        
    );
};

export default Login;
