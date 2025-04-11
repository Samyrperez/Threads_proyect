import React from "react";
import Publicar from "./TabHilos/Publicar";
import TareasPerfil from "../Tabs/TabHilos/TareasPerfil"; // 
// import ListaHilos from "../components/ListaHilos"; // Lista de hilos creados por el usuario

const fakeUser = {
    name: "Samyr Perez",
    username: "sammmperezz",
    email: "sam@example.com",
    avatar:
        "https://images.imagenmia.com/model_version/bbfea91410ef7994cfefde4a33e032f3aebf7b90dda683f7fa32ea2685d2e7bb/1723819204347-output.jpg",
    bio: "Ingeniero ambiental y sanitario\n💍 @lola_rodriguezz\nS&Y ❤️\n🧍‍♂️🎵🎸",
    followers: 78,
    badges: ["📷", "🔗"],
};

const TabHilos = () => {
    return (
        <div className="tab-hilos">
            
                <Publicar avatar={fakeUser.avatar} />
                <TareasPerfil />
            {/* <ListaHilos /> */}
        </div>
    );
};

export default TabHilos;

