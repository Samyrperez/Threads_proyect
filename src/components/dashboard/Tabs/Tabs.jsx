import { useState } from "react";
import "../../../css/profile.css";
import "../../../css/Tabs.css";
import TabHilos from "./TabHilos";
import TabReposts from "./TabReposts";
import TabRespuestas from "./TabRespuestas";



const Tabs = () => {
    const [activeTab, setActiveTab] = useState("hilos");

    const renderContent = () => {
        switch (activeTab) {
            case "hilos":
        return <TabHilos />;
        case "respuestas":
            return <TabRespuestas />;
        case "reposts":
        return <TabReposts />;
            default:
                return null;
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="tabs-container">

            <div className="tab-buttons">
                <div
                    className={`tab ${activeTab === "hilos" ? "active" : ""}`}
                    onClick={() => handleTabClick("hilos")}
                >
                    Hilos
                </div>
                <div
                    className={`tab ${activeTab === "respuestas" ? "active" : ""}`}
                    onClick={() => handleTabClick("respuestas")}
                >
                    Respuestas
                </div>
                <div
                    className={`tab ${activeTab === "reposts" ? "active" : ""}`}
                    onClick={() => handleTabClick("reposts")}
                >
                    Reposts
                </div>
            </div>
            
            <div className="tab-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default Tabs;
