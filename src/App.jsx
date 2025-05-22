import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Login from "./pages/Login"; 
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PrivateRoute";
import "./css/styles.css";

function App() {
  const usuario = localStorage.getItem("usuario");
  const isAuthenticated = !!usuario;

  return (
    <Routes>
      {/* Ruta raíz: redirige a login o dashboard */}
      <Route 
        path="/" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        } 
      />

      {/* publicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* privadas */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
