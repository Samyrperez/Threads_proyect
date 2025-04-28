import React from 'react';
import Home from '../../pages/Home';
import Search from "../../pages/Search";
// import Add from "../../pages/Add";
import Favorites from "../../pages/Favorites";
import Profile from "../../pages/Profile";
import '../../css/main_container.css';




const MainContainer = ({ user, active }) => {

    const renderContent = () => {
        switch (active) {
            case "home":
                return <Home user={user} />;
            case "search":
                return <Search />;
            case "favorites":
                return <Favorites />;
            case "profile":
                return <Profile user={user} />;
            default:
                return <Home user={user} />;
        }
    };

    return (
        <div className="container-main">          
            
            {renderContent()}
            
        </div>
    );
};

export default MainContainer;