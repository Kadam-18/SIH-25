import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
<<<<<<< Updated upstream
import BillingInvoices from "./pages/BillingInvoice.jsx";
import PatientHistory from "./pages/PatientHistory.jsx";
import UserProfile from "./pages/Userprofile.jsx";
import Layout from "./components/Layout.jsx";

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

=======
import Notifications from "./pages/Notifications";

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
>>>>>>> Stashed changes
const App = () => {
  console.log("PatientHistory page loaded ✅");
  return (
    <Router>
      <div className="app-root">
      <Routes>
        {/* Default route will redirect to signup */}
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
<<<<<<< Updated upstream
        
        {/* Private (layout-based) routes */}
        <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/billing" element={<BillingInvoices />} />
            <Route path="/patienthistory" element={<PatientHistory  />} />
            <Route path="/userprofile" element={<UserProfile />} />
             {/* Add other sidebar pages here later */}
        </Route>
=======
        <Route path="/Home"element={<Home/>}/>
        <Route path="/notifications" element={<Notifications />} />
>>>>>>> Stashed changes
      </Routes>
      <ToastContainer />
      </div>
    </Router>
  );
};

export default App;

