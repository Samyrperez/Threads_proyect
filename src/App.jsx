import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/Login"; 
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import "./css/styles.css"; // Importa los estilos globales

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    
  );
}

export default App;
