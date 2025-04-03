import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/Login"; 
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import "./css/styles.css"; // Importa los estilos globales

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    
  );
}

export default App;
