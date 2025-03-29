import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
// import Register from "./pages/Register";

import './App.css'


function App(){
  return (
    <>
      <Router>
        <Routes>
          {/* Route recibe dos atributos: path(Con que dirección accede a ese elemento) */}
          {/* <Route path='/' element= {<Home/>} /> */}
          <Route path='/login' element= {<Login/>} />
          {/* <Route path='/register' element= {<Register/>} />
          <Route path='/dasboard' element= {<Dasboard/>} />  */}
        </Routes>
      </Router>
    </>
  )
}


export default App
