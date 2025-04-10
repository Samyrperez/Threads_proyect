import { useEffect, useState, useRef  } from "react";
import "../css/styles_dashboard.css";
import ThreadsLogo from "../components/dashboard/ThreadsLogo";
import MenuIcon from "../components/icons/MenuIcon";
import Sidebar from "../components/dashboard/Sidebar";
import LogoSplash from "../components/dashboard/LogoSplash";
import DropdownMenu from "../components/dashboard/DropdownMenu";
import MainContainer from "../components/dashboard/MainConatiner";
import AddIcon from "../components/icons/AddIcon";




const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [active, setActive] = useState("home");
    const [showLogo, setShowLogo] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const toggleRef = useRef(null);


    useEffect(() => {
        // Simulación de usuario autenticado (esto debería ser reemplazado por la lógica real de autenticación)
        // Aquí puedes obtener el usuario de un servicio o contexto global
        // Por ejemplo, usando localStorage o un contexto de React
        
        setUser({
            username: "SamCode",
            email: "sam@example.com",
            avatar: "https://images.imagenmia.com/model_version/bbfea91410ef7994cfefde4a33e032f3aebf7b90dda683f7fa32ea2685d2e7bb/1723819204347-output.jpg",
        });
        const timer = setTimeout(() => {
            setShowLogo(false); // Oculta el logo después de 2 segundos
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                toggleRef.current &&
                !toggleRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };


    return (

    <>
        <div className="dashboard-container">
            
            {/* Logo de Threads que aparece al inicio  */}
            {showLogo && <LogoSplash onClick={() => setShowLogo(false)} />}


            <div className="logoAndMenu">
                <div className="logo-responsive">
                    <ThreadsLogo />
                </div>
                <div className="menu-responsive" ref={toggleRef}  onClick={toggleDropdown}>
                    <MenuIcon active={showDropdown} />
                    
                </div>

                {showDropdown && <DropdownMenu dropdownRef={dropdownRef} />}
            
            </div>

{/* Containers barra de contenido, main y btn-add */}
            <Sidebar
                active={active}
                setActive={setActive}
                showDropdown={showDropdown}
                toggleDropdown={toggleDropdown}
                dropdownRef={dropdownRef}
                toggleRef={toggleRef}
            />
            
            <MainContainer user={user} active={active} />


            <div className="container-btnFloating">
                <button className="btn-floating">
                    <a href="">
                        <AddIcon/>
                    </a>
                </button>
            </div>
        </div>

    </>
        
    );
};

export default Dashboard;