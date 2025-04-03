import { useEffect, useState } from "react";
import "../css/styles_darshboard.css";
import homeDark from "../image/home_dark.png";
import homeWhite from "../image/home.png";
import searchDark from "../image/search_dark.png";
import searchWhite from "../image/search.png";
import addDark from "../image/add_dark.png";
import addWhite from "../image/add.png";
import favoriteDark from "../image/favorite_dark.png";
import favoriteWhite from "../image/favorite.png";
import personDark from "../image/person_dark.png";
import personWhite from "../image/person.png";



const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [active, setActive] = useState(null);

    useEffect(() => {
        // Simulación de usuario autenticado (Aquí puedes conectar con la API más adelante)
        setUser({
            username: "SamCode",
            email: "sam@example.com",
            avatar: "https://images.imagenmia.com/model_version/bbfea91410ef7994cfefde4a33e032f3aebf7b90dda683f7fa32ea2685d2e7bb/1723819204347-output.jpg",
        });
    }, []);
    

    return (
        <div className="dashboard-container">
            <div className="contaner-sidebar">
                <div className="logo">
                    <img src="https://images.seeklogo.com/logo-png/48/2/threads-logo-png_seeklogo-489791.png" alt="" />
                </div>
                <nav className="nav-dashboard">
                    <a href="#" onClick={() => setActive("home")}>
                        <img src={active === "home" ? homeWhite : homeDark} alt="Home" />
                    </a>
                    <a href="#" onClick={() => setActive("search")}>
                        <img src={active === "search" ? searchWhite : searchDark} alt="Buscar" />
                    </a>
                    <a href="#" onClick={() => setActive("add")}>
                        <img src={active === "add" ? addWhite : addDark} alt="Agregar" />
                    </a>
                    <a href="#" onClick={() => setActive("favorite")}>
                        <img src={active === "favorite" ? favoriteWhite : favoriteDark} alt="Favorito" />
                    </a>
                    <a href="#" onClick={() => setActive("profile")}>
                        <img src={active === "profile" ? personWhite : personDark} alt="Perfil" />
                    </a>
                </nav>
                <div className="container-menu">
                    <img src="./src/image/menu_dark.png"
                    alt="Menú" 
                    />
                    
                </div>
            </div>
            
            <div className="container-main">
                <div className="post-box">
                    {user && <img src={user.avatar} alt="Avatar" className="avatar" />}
                    <p>¿Qué hay de nuevo?</p>
                    <button>Publicar</button>
                </div>
            </div>
            <div className="container-btnFloating">
                <button className="btn-floating">
                    <a href="">
                        <img src="./src/image/add.png" alt="add"/>
                    </a>
                </button>
            </div>

        </div>
    );
};

export default Dashboard;