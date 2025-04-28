import { useNavigate } from "react-router-dom";
import ThreadsLogo from "./ThreadsLogo";
import HomeIcon from "../icons/HomeIcon";
import SearchIcon from "../icons/SearchIcon";
import AddIcon from "../icons/AddIcon";
import FavoriteIcon from "./FavoriteIcon";
import ProfileIcon from "../icons/ProfileIcon";
import MenuIcon from "../icons/MenuIcon";
import DropdownMenu from "./DropdownMenu";
import { logoutUser } from "../../api/auth/logout";



const Sidebar = ({ active, setActive, showDropdown, toggleDropdown, dropdownRef, toggleRef, onAddClick }) => {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        logoutUser(); 
        navigate("/login");
    };
    
    return (
        <div className="container-sidebar">
            <div className="logo">
                <ThreadsLogo />
            </div>
            <nav className="nav-dashboard">
                <a href="#" onClick={() => setActive("home")}>
                    <HomeIcon active={active === "home"} />
                </a>
                <a href="#" onClick={() => setActive("search")}>
                <SearchIcon active={active === "search"} />

                </a>
                <a href="#" onClick={() => {
                    setActive("add");
                    onAddClick();
                }}>
                    <AddIcon active={active === "add"} />
                </a>
                <a href="#" onClick={() => setActive("favorites")}>
                    <FavoriteIcon active={active === "favorites"} />
                </a>
                <a href="#" onClick={() => setActive("profile")}>
                    <ProfileIcon active={active === "profile"} />
                </a>
            </nav>
            <div className="container-menu" ref={toggleRef} onClick={toggleDropdown}>
                <MenuIcon active={showDropdown} />
                {showDropdown && <DropdownMenu dropdownRef={dropdownRef} onLogout={cerrarSesion} />}
            </div>
        </div>
    );
};

export default Sidebar;
