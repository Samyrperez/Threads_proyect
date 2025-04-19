import { useEffect, useState } from "react";
import EditarPerfilModal from "../components/dashboard/Profile/EditarPerfilModal";
import { obtenerPerfil } from "../api/perfil/obtenerPerfil";
import { editarPerfil } from "../api/perfil/editarPerfil";
import Tabs from "../components/dashboard/Tabs/Tabs";
import ModalAvatar from "../components/dashboard/Profile/ModalAvatar";
import Publicacion from "../components/dashboard/Home/Publicacion";
import "../../src/css/profile.css";
import "../../src/css/Tabs.css";

const Profile = () => {
    const [user, setUser] = useState(null); 
    const [modalAbierto, setModalAbierto] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState("hilos");
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const userId = localStorage.getItem("userId");

                if (!userId) {
                    setError("No se encontró el ID del usuario. Iniciá sesión nuevamente.");
                    return;
                }

                const perfil = await obtenerPerfil(userId);
                console.log("Datos recibidos del perfil:", perfil);
                setUser(perfil);
                console.log("👤 Usuario seteado:", perfil);

            } catch (error) {
                console.error("Error al cargar perfil:", error);
                setError("Hubo un problema al cargar tu perfil.");
            }
        };

        cargarPerfil();
    }, []);

    const abrirModal = () => setModalAbierto(true);
    const cerrarModal = () => setModalAbierto(false);

    const guardarCambios = async (datosActualizados) => {
        try {
            await editarPerfil(datosActualizados); // no importa si esto no devuelve data
            const userId = localStorage.getItem("userId");
            const perfilActualizado = await obtenerPerfil(userId); // vuelve a consultar
            setUser(perfilActualizado);
            cerrarModal();
        } catch (error) {
            console.error("Error al guardar el perfil:", error);
        }
    };

    if (error) return <p className="error-text">{error}</p>;
    if (!user) return <p>Cargando perfil...</p>;

    const { name, username, email, id, total_seguidores, description, avatar } = user;



    return (
        <div className="profile-container-wrapper">
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-info">
                        <div className="div">
                            <h2 className="name">{name}</h2>
                            <p className="username">{username}</p>
                            {/* <p className="email">{email}</p>
                            <p className="id">ID: {id}</p> */}
                        </div>
                        <div className="avatar-image">
                            <img
                                src={avatar ? `https://dockerapps.pulzo.com/threads${avatar}` : "/default-avatar.png"}
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
                        <div className="bio">{description || "Aún sin biografía"}</div>
                        <p className="followers">👥 {total_seguidores} seguidores</p>
                        <button className="edit-btn" onClick={abrirModal}>
                            Editar perfil
                        </button>
                    </div>
                </div>


                <EditarPerfilModal
                    isOpen={modalAbierto}
                    onClose={cerrarModal}
                    user={user}
                    onSave={guardarCambios}
                />

                <div className="profile-tabs">
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

                    {/* {activeTab === "hilos" && (
                        <div className="profile-user-posts">
                            {publicaciones?.map((pub) => (
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
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default Profile;
