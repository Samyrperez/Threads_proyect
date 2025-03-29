

"react-router-dom";

function Login() {

    return (
        <>
            <div className="login-container">
                <h2>Iniciar Sesión</h2>
                <input 
                    type="text"
                    name="usuario"
                    placeholder="Nombre de usuario, teléfono o correo electronico"
                    required
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="constraseña"
                    required
                />
                <button type="submit">Iniciar Sesión</button>
            </div>
            <div className="rememberPassword-container">
                <h2>¿Has olvidado la contraseña?</h2>
            </div>
            <div className="goInstagram"><img src="" alt="" /> <h2>Ir a instagram</h2></div>
        </>
    )
}

export default Login