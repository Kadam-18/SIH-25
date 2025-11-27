import React, { useState, useEffect } from "react";
import { apiGet, apiPut } from "../api";
import "./SchedulePage.css";

export default function SchedulePage() {
  const token = localStorage.getItem("token");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const res = await apiGet("/api/appointments/user/", token);

    if (!res) return;

    // If backend returns appointments directly:
    if (Array.isArray(res)) {
      setAppointments(res);
    } 
    // If backend returns { data: [...] }
    else if (res.data) {
      setAppointments(res.data);
    }
  };

  const checkIn = async (id) => {
    await apiPut(`/api/appointments/detail/${id}/`, { status: "Checked-in" }, token);
    loadAppointments();
  };

  const cancelAppt = async (id) => {
    await apiPut(`/api/appointments/detail/${id}/`, { status: "Cancelled" }, token);
    loadAppointments();
  };

  return (
    <div className="schedule-container">
      <h1>Your Appointments</h1>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appt) => (
          <div className="schedule-card" key={appt.id}>
            <p><strong>Date:</strong> {appt.date}</p>
            <p><strong>Time:</strong> {appt.time}</p>
            <p><strong>Center:</strong> {appt.center_name}</p>
            <p><strong>Doctor:</strong> {appt.doctor_name}</p>
            <p><strong>Status:</strong> {appt.status}</p>

            <button onClick={() => checkIn(appt.id)}>Check In</button>
            <button onClick={() => cancelAppt(appt.id)}>Cancel</button>
          </div>
        ))
      )}
    </div>
  );
}
