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
import Notifications from "./pages/Notifications.jsx";
import LandingPage from "./pages/Landing.jsx";

import VerifyOTP from "./pages/VerifyOTP.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<Navigate to="/Landing.jsx" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/login" element={<Login />} />

          <Route path="/landing" element={<LandingPage />} />

          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/home" element={<Home />} />
            <Route path="/billing" element={<BillingInvoices />} />
            <Route path="/patienthistory" element={<PatientHistory />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/schedule" element={<Schedulepage />} />
          </Route>
        </Routes>

        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
