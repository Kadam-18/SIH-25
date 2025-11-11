import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <Router>
      <div className="app-root">
      <Routes>
        {/* Default route will redirect to signup */}
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home"element={<Home/>}/>
      </Routes>
      <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
