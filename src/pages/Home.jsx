// src/components/pages/Home.jsx
import React from "react";
import Publicar from "../components/dashboard/Tabs/TabHilos/Publicar";


import Publicacion from "../components/dashboard/Home/Publicacion";
import "../css/Home.css";

const publicaciones = [
    {
        id: 1,
        usuario: {
            nombre: "tattsuya",
            avatar: "https://i.pravatar.cc/150?img=1"
        },
        tiempo: "12 h",
        texto: "¡Qué tremendo episodio el de hoy! 😤🔥",
        imagen: "https://i.imgur.com/VpD7Kpq.jpeg",
        likes: 687,
        respuestas: 7,
        compartidos: 28,
        guardados: 48
    },
    {
        id: 2,
        usuario: {
            nombre: "aiko_23",
            avatar: "https://i.pravatar.cc/150?img=2"
        },
        tiempo: "3 h",
        texto: "Estoy amando esta nueva app 🖤",
        imagen: null,
        likes: 102,
        respuestas: 5,
        compartidos: 12,
        guardados: 33
    },
    {
        id: 3,
        usuario: {
            nombre: "nobaraa",
            avatar: "https://i.pravatar.cc/150?img=3"
        },
        tiempo: "1 h",
        texto: "Recuerden hidratarse y descansar. ¡Feliz domingo!",
        imagen: null,
        likes: 88,
        respuestas: 2,
        compartidos: 5,
        guardados: 11
    }
];



const Home = ({ user }) => {
    const fakeUser = {
        name: user?.name || "Invitado",
        username: user?.username || "guest",
        email: user?.email || "guest@example.com",
        avatar:
            user?.avatar ||
            "https://images.imagenmia.com/model_version/bbfea91410ef7994cfefde4a33e032f3aebf7b90dda683f7fa32ea2685d2e7bb/1723819204347-output.jpg",
        bio: "Ingeniero ambiental y sanitario\n💍 @lola_rodriguezz\nS&Y ❤️\n🫍‍♂️🎵🎸",
        followers: 78,
        badges: ["📷", "🔗"]
    };

    return (

        <div className="home-container">
            <Publicar avatar={fakeUser.avatar} />

            <div className="home-content">

                <div className="scroll-publicaciones">
                    {publicaciones.map((pub) => (
                        <Publicacion
                            key={pub.id}
                            usuario={pub.usuario}
                            tiempo={pub.tiempo}
                            texto={pub.texto}
                            imagen={pub.imagen}
                            likes={pub.likes}
                            respuestas={pub.respuestas}
                            compartidos={pub.compartidos}
                            guardados={pub.guardados}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
