import { useState } from "react";
import Tabs from "../components/dashboard/Tabs/Tabs";
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

    const { name, username, avatar, bio, followers, badges } = fakeUser;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-info">
                    <div className="div">
                        <h2>{name}</h2>
                        <p className="username">@{username}</p>
                    </div>
                    <div className="avatar-image">
                        <img src={avatar} alt="avatar" className="avatar" />
                    </div>
                </div>
                <div className="profile-details">
                    <div className="bio">{bio}</div>
                    
                    <p className="followers">👥 {followers} seguidores</p>
                    {/* <div className="badges">
                        {badges.map((b, i) => (
                            <span key={i}>{b}</span>
                        ))}
                    </div> */}
                    <button className="edit-btn">Editar perfil</button>
                </div>
                
            </div>

            {/* Tabs - no funcional aún */}
            <div className="profile-tabs">
                <Tabs />
            </div>
            
        </div>
    );
};

export default Profile;
