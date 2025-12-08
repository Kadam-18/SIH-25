import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext";
import DashboardLayout from "./layouts/DashboardLayout";

import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import Appointments from "./pages/doctor/Appointments";
import Patients from "./pages/doctor/Patients";

import TherapistDashboard from "./pages/therapist/TherapistDashboard";
import TherapySchedule from "./pages/therapist/TherapySchedule";
import AssignedPatients from "./pages/therapist/AssignedPatients";
import ProcedureDocs from "./pages/therapist/ProcedureDocs";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <MenuProvider>
        <Router>
          <Routes>
            {/* Doctor routes */}
            <Route
              path="/doctor"
              element={
                <DashboardLayout>
                  <DoctorDashboard />
                </DashboardLayout>
              }
            />
            <Route
              path="/doctor/appointments"
              element={
                <DashboardLayout>
                  <Appointments />
                </DashboardLayout>
              }
            />
            <Route
              path="/doctor/patients"
              element={
                <DashboardLayout>
                  <Patients />
                </DashboardLayout>
              }
            />

            {/* Therapist routes */}
            <Route
              path="/therapist"
              element={
                <DashboardLayout>
                  <TherapistDashboard />
                </DashboardLayout>
              }
            />
            <Route
              path="/therapist/schedule"
              element={
                <DashboardLayout>
                  <TherapySchedule />
                </DashboardLayout>
              }
            />
            <Route
              path="/therapist/patients"
              element={
                <DashboardLayout>
                  <AssignedPatients />
                </DashboardLayout>
              }
            />
            <Route
              path="/therapist/docs"
              element={
                <DashboardLayout>
                  <ProcedureDocs />
                </DashboardLayout>
              }
            />

            {/* Default */}
            <Route path="*" element={<Navigate to="/doctor" replace />} />
          </Routes>
        </Router>
      </MenuProvider>
    </AuthProvider>
  );
}

export default App;
