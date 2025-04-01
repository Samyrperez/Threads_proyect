import "../css/styles.css";

export default function Footer() {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Condiciones de Threads. Todos los derechos reservados.</p>
            <nav>
                <a href="#">Términos</a>
                <a href="#">Política de privacidad</a>
                <a href="#">Ayuda</a>
            </nav>
        </footer>
    );
}