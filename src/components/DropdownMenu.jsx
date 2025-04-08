// src/components/DropdownMenu.jsx
import React from "react";

const DropdownMenu = ({ dropdownRef }) => {
    return (
        <div className="menu-dropdown" ref={dropdownRef}>
            <ul>
                <li><a href="#">Aspecto</a></li>
                <li><a href="#">Insights</a></li>
                <li><a href="#">Configuración</a></li>
                <li><a href="#">Informar de un problema</a></li>
                <li><a href="#">Cerrar sesión</a></li>
            </ul>
        </div>
    );
};

export default DropdownMenu;
