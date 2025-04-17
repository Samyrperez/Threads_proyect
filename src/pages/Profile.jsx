import { useState } from "react";
import EditarPerfilModal from "../components/dashboard/Profile/EditarPerfilModal";
// import "../components/dashboard/Profile/EditarPerfilModal.css";
import Tabs from "../components/dashboard/Tabs/Tabs";
import ModalAvatar from "../components/dashboard/Profile/ModalAvatar";
import Publicacion from "../components/dashboard/Home/Publicacion";
import "../../src/css/profile.css";
import "../../src/css/Tabs.css";



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



const Profile = () => {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [misPublicaciones, setMisPublicaciones] = useState([
        {
            id: 101,
            usuario: {
                nombre: "sammmperezz",
                avatar: fakeUser.avatar,
            },
            tiempo: "Hace 1 min",
            texto: "¡Hola mundo desde mi perfil!",
            imagen: "https://i.imgur.com/VpD7Kpq.jpeg",
            likes: 5,
            respuestas: 0,
            compartidos: 2,
            guardados: 1
        },
        {
            id: 102,
            usuario: {
                nombre: "sammmperezz",
                avatar: fakeUser.avatar,
            },
            tiempo: "Hace 1 día",
            texto: "Otra publicación solo mía 😎",
            imagen: null,
            likes: 20,
            respuestas: 1,
            compartidos: 0,
            guardados: 3
        }
    ]);

    const { name, username, avatar, bio, followers } = fakeUser;
    const [showModal, setShowModal] = useState(false);
    const abrirModal = () => setModalAbierto(true);
    const cerrarModal = () => setModalAbierto(false);
    const [activeTab, setActiveTab] = useState("hilos");

    const guardarCambios = () => {
        // Aquí irá lógica para guardar cuando tengas API
        cerrarModal();
    };

    return (
        <div className="profile-container-wrapper">
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-info">
                        <div className="div">
                            <h2>{name}</h2>
                            <p className="username">@{username}</p>
                        </div>
                        <div className="avatar-image">
                            <img
                                src={avatar}
                                alt="avatar"
                                className="avatar"
                                onClick={() => setShowModal(true)}
                            />
                            {showModal && (
                                <ModalAvatar
                                    imageUrl={fakeUser.avatar}
                                    onClose={() => setShowModal(false)}
                                />
                            )}
                        </div>
                    </div>
                    <div className="profile-details">
                        <div className="bio">{bio}</div>

                        <p className="followers">👥 {followers} seguidores</p>
                        <button className="edit-btn" onClick={abrirModal}>Editar perfil</button>
                    </div>

                </div>

                <EditarPerfilModal
                    isOpen={modalAbierto}
                    onClose={cerrarModal}
                    user={fakeUser}
                    onSave={guardarCambios}
                // user={usuario}
                // onSave={handleGuardarCambios}
                />


                <div className="profile-tabs">
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    {activeTab === "hilos" && (
                        <div className="profile-user-posts">
                            {misPublicaciones.map((pub) => (
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
                    )}

                </div>
            </div>

        </div>



    );
};

export default Profile;

/*
import { useState } from "react";
import EditarPerfilModal from "../components/dashboard/Profile/EditarPerfilModal";
import Tabs from "../components/dashboard/Tabs/Tabs";
import ModalAvatar from "../components/dashboard/Profile/ModalAvatar";
import "../../src/css/profile.css";
import "../../src/css/Tabs.css";
// import { obtenerPerfil, editarPerfil  } from "@/api/perfil"; // 🔓 Descomenta cuando tengas la API

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

const Profile = () => {
    const [user, setUser] = useState(fakeUser);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const abrirModal = () => setModalAbierto(true);
    const cerrarModal = () => setModalAbierto(false);

    const guardarCambios = async (datosActualizados) => {
        try {
            // 🔁 Si tienes la API lista, usa esta versión:
            // const usuarioActualizado = await editarPerfil(datosActualizados);
            // setUser(usuarioActualizado);

            // 🧪 Mientras tanto, simula guardado local
            setUser(datosActualizados);

            cerrarModal();
        } catch (error) {
            console.error("Error al guardar el perfil:", error);
        }
    };

    const { name, username, avatar, bio, followers } = user;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-info">
                    <div className="div">
                        <h2>{name}</h2>
                        <p className="username">@{username}</p>
                    </div>
                    <div className="avatar-image">
                        <img 
                            src={avatar} 
                            alt="avatar" 
                            className="avatar"
                            onClick={() => setShowModal(true)} 
                        />
                        {showModal && (
                            <ModalAvatar
                                imageUrl={avatar}
                                onClose={() => setShowModal(false)}
                            />
                        )}
                    </div>
                </div>

                <div className="profile-details">
                    <div className="bio">{bio}</div>
                    <p className="followers">👥 {followers} seguidores</p>
                    <button className="edit-btn" onClick={abrirModal}>Editar perfil</button>
                </div>
            </div>

            <EditarPerfilModal
                isOpen={modalAbierto}
                onClose={cerrarModal}
                user={user}
                onSave={guardarCambios}
            />


*/
