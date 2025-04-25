import { useEffect, useState } from "react";
import EditarPerfilModal from "../components/dashboard/Profile/EditarPerfilModal";
import { obtenerPerfil } from "../api/perfil/obtenerPerfil";
import { editarPerfil } from "../api/perfil/editarPerfil";
import Tabs from "../components/dashboard/Tabs/Tabs";
import ModalAvatar from "../components/dashboard/Profile/ModalAvatar";
import Publicacion from "../components/dashboard/Home/Publicacion";
import { obtenerComentarios } from "../api/publicaciones/obtenerComentarios";
import "../../src/css/profile.css";
import "../../src/css/Tabs.css";


const Profile = () => {
    const [user, setUser] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState("hilos");
    const [error, setError] = useState(null);
    const [publicaciones, setPublicaciones] = useState([]);


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

                // Obtener comentarios y filtrar los del usuario
                const comentariosData = await obtenerComentarios();
                const comentariosUsuario = comentariosData.data?.filter(
                    (comentario) => comentario.comentario.usuario.id === parseInt(userId)

                ) || [];

                console.log("📝 Publicaciones del usuario:", comentariosUsuario);
                setPublicaciones(comentariosUsuario);
                console.log("📤 Publicaciones seteadas en Profile:", comentariosUsuario);


            } catch (error) {
                console.error("Error al cargar perfil:", error);
                setError("Hubo un problema al cargar tu perfil.");
            }
        };

        cargarPerfil();
    }, []);

    useEffect(() => {
        console.log("🧾 Prop publicaciones recibidas en Tabs:", publicaciones);
    }, [publicaciones]);
    

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
                    <Tabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        publicaciones={publicaciones}
                        avatar={avatar}
                    />


                    {/* {activeTab === "hilos" && (
                        <div className="profile-user-posts">
                            {publicaciones.map((pub) => (
                                <Publicacion
                                    key={pub.comentario.id}
                                    id={pub.comentario.id}
                                    usuario={pub.comentario.usuario}
                                    tiempo={pub.comentario.fecha_creacion}

                                    texto={pub.comentario.contenido}
                                    imagen={null} // si tiene imagen, ajusta aquí
                                    likes={pub.comentario.me_gusta_total}
                                    respuestas={pub.respuestas?.length || 0}
                                    compartidos={0} // si tienes esa info
                                    guardados={0} // si tienes esa info
                                    comentarios={pub.respuestas || []}
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
