import React from 'react';
import PostBox from './PostBox';
import PostItem from './PostItem';
import Home from '../../pages/Home';
import Search from "../../pages/Search";
import Add from "../../pages/Add";
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
            case "add":
                return <Add />;
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
            {/* <PostBox user={user} /> */}

            {/* <div className="post-list"> */}
                {/* Aquí podemos mapear publicaciones simuladas */}
                {/* <PostItem
                    avatar="https://i.pravatar.cc/150?img=1"
                    username="mfirbdxx"
                    time="13 h"
                    text="Epic Battle Kakashi vs Gojo in Multiverse of Madness. Who will win?"
                    media={null}
                    likes={540}
                    comments={17}
                    reposts={33}
                    stats={86}
                />
                <PostItem
                    avatar="https://i.pravatar.cc/150?img=2"
                    username="mouredev"
                    time="13 h"
                    text="Mi curso de SQL y Bases de Datos desde cero acaba de llegar a un millón de visualizaciones 😍"
                    media={null}
                    likes={221}
                    comments={12}
                    reposts={9}
                    stats={34}
                /> */}
            {/* </div> */}
            
            
            {renderContent()}
            
        </div>
    );
};

export default MainContainer;