import React from "react";
import LandingPage from "./pages/Landing.jsx";
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

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifications from "./pages/Notifications.jsx";

const App = () => {
  console.log("PatientHistory page loaded ✅");
  return (
    <Router>
      <div className="app-root">
        <Routes>
          {/* 🔹 Default route → Landing page */}
          <Route path="/" element={<Navigate to="/landing" />} />

          {/* 🔹 Public pages (NO layout) */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* 🔹 Private pages WITH layout (navbar + sidebar) */}
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/billing" element={<BillingInvoices />} />
            <Route path="/patienthistory" element={<PatientHistory />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/notifications" element={<Notifications />} />
            {/* other sidebar pages later */}
          </Route>
        </Routes>

        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
