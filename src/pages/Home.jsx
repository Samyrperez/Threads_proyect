// src/components/pages/Home.jsx
const Home = ({ user }) => {
    return (
        <div className="home-container">
            <h2>Bienvenido {user?.username}</h2>
            <p>Aquí verás las últimas publicaciones.</p>
        </div>
    );
};

export default Home;
