import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/apiLogin";
import "../css/styles.css"; // Importa el archivo CSS

const Login = () => {
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showLogo, setShowLogo] = useState(true);
    const navigate = useNavigate();

    
        useEffect(() => {
            const timer = setTimeout(() => {
              setShowLogo(false); // Oculta el logo después de 3 segundos
            }, 2000);
            return () => clearTimeout(timer);
        }, []);

        // const usuarioSimulado = {
        //     email: "samyr.perezpabon@gmail.com",
        //     password: "samperez0819",
        //     username: "samperez",
        //     name: "Samyr Perez"
        // };
        
    async function handleLogin(e) {
        e.preventDefault();
        setError("");

        try {
            // Aceptamos tanto email como username en el input
            const isEmail = input.includes("@");
            const credentials = isEmail
                ? { email: input, password }
                : { username: input, password };

            const data = await loginUser(credentials); // Llama al backend

            // Guarda el usuario y token
            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            localStorage.setItem("token", data.token);

            // Limpia el formulario
            setInput("");
            setPassword("");

            // Redirige
            navigate("/dashboard");
        } catch (error) {
            console.error("Error en el login:", error);
            setError(error.message || "Error al iniciar sesión");
        }
    }


    
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
                        ¿No tienes cuenta? <a href="./register" className="register-link">Regístrate</a>
                    </p>
                </div>
                <div className="goToInstagram">
                    <a href="https://www.instagram.com/">
                        <button className="button-instagram">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                                alt="Logo Instagram"
                                className="logo-instagram"
                            />
                            <p>Ir a Instagram  </p>
                            <img src="./src/image/MayorQue_menor.png" alt="Ir" className="ir-instagram"/>
                        </button>
                    </a>
                    
                </div>

                <div id="footer">
                    <Footer />
                </div>
                
            </div>
        </div>
        
    );
};

export default Login;
