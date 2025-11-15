import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import BillingInvoices from "./pages/BillingInvoice.jsx";
import PatientHistory from "./pages/PatientHistory.jsx";
import UserProfile from "./pages/Userprofile.jsx";
import Layout from "./components/Layout.jsx";
import Schedulepage from "./pages/Schedulepage.jsx";
// import ProgressTracking from "./pages/Progresstracking.jsx"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Notifications from "./pages/Notifications.jsx";

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
        
        {/* Private (layout-based) routes */}
        <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/billing" element={<BillingInvoices />} />
            <Route path="/patienthistory" element={<PatientHistory  />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/schedule" element={<Schedulepage />} />
            {/* <Route path="/progress" element={<ProgressTracking />} /> */}
             {/* Add other sidebar pages here later */}
        </Route>
      </Routes>
      <ToastContainer />
      </div>
    </Router>
  );
};

export default App;