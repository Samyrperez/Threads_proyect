import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/Login"; 
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PrivateRoute"; // Importa el componente de ruta privada
import "./css/styles.css"; // Importa los estilos globales

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* ruta protegida */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
        }
      />
        <Route path="/home" element={<Home />} />
      </Routes>
    
  );
}

export default App;
