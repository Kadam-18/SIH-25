import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaUserMd,
  FaMapMarkerAlt,
  FaEdit,
  FaTimes,
  FaCheckCircle,
  FaSearch,
} from "react-icons/fa";
import "./SchedulePage.css";

export default function SchedulePage() {
  // ---------- Dummy Data ----------
  const initialAppointments = [
    {
      id: 1,
      date: "2025-11-15",
      time: "10:00 AM",
      doctor: "Dr. Anjali Sharma",
      location: "AyurCare Centre, Building A, Room 302",
      type: "Consultation",
      status: "Scheduled",
    },
    {
      id: 2,
      date: "2025-11-20",
      time: "03:30 PM",
      doctor: "Dr. Meera Nair",
      location: "Ayurveda Wellness, Block C, Room 105",
      type: "Therapy",
      status: "Scheduled",
    },
    {
      id: 3,
      date: "2025-10-25",
      time: "01:00 PM",
      doctor: "Dr. Rajesh Patel",
      location: "Kerala Ayur Clinic, Tower 2, Room 12",
      type: "Follow-up",
      status: "Completed",
    },
    {
      id: 4,
      date: "2025-09-12",
      time: "11:15 AM",
      doctor: "Dr. Nivedita Rao",
      location: "Ayush Health Centre, Main Wing, Room 203",
      type: "Consultation",
      status: "Cancelled",
    },
    {
      id: 5,
      date: "2025-11-25",
      time: "09:00 AM",
      doctor: "Dr. Meera Nair",
      location: "Ayurveda Wellness, Block B, Room 112",
      type: "Therapy",
      status: "Scheduled",
    },
  ];

  // ---------- State ----------
  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [rescheduleModal, setRescheduleModal] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  // ---------- Handlers ----------
  const handleCancel = (id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a))
    );
  };

  const handleCheckIn = (id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Checked-in" } : a))
    );
  };

  const handleReschedule = (id) => {
    setRescheduleModal(id);
  };

  const saveReschedule = (id) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              date: newDate || a.date,
              time: newTime || a.time,
              status: "Rescheduled",
            }
          : a
      )
    );
    setRescheduleModal(null);
    setNewDate("");
    setNewTime("");
  };

  const filteredAppointments = appointments.filter((a) => {
    const matchSearch =
      a.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "All" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="schedule-root">
      <div className="schedule-header">
        <div>
          <h1>Schedule Page</h1>
          <p className="muted">
            Track and manage your upcoming Panchakarma appointments.
          </p>
        </div>

        <div className="search-filter">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by doctor, clinic, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="filter-dropdown"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All</option>
            <option>Scheduled</option>
            <option>Completed</option>
            <option>Cancelled</option>
            <option>Checked-in</option>
            <option>Rescheduled</option>
          </select>
        </div>
      </div>

      {/* Appointment List */}
      <div className="appointments-list">
        {filteredAppointments.length === 0 ? (
          <p className="no-data">No appointments scheduled.</p>
        ) : (
          filteredAppointments.map((a) => (
            <div key={a.id} className="appointment-card">
              <div className="row">
                <FaCalendarAlt className="icon" />
                <span>
                  <strong>Date & Time:</strong> {a.date}, {a.time}
                </span>
              </div>

              <div className="row">
                <FaUserMd className="icon" />
                <span>
                  <strong>Doctor:</strong> {a.doctor}
                </span>
              </div>

              <div className="row">
                <FaMapMarkerAlt className="icon" />
                <span>
                  <strong>Location:</strong> {a.location}
                </span>
              </div>

              <div className="row">
                <span>
                  💬 <strong>Type:</strong> {a.type}
                </span>
                <span>
                  🔖 <strong>Status:</strong>{" "}
                  <span className={`status ${a.status.toLowerCase()}`}>
                    {a.status}
                  </span>
                </span>
              </div>

              <div className="actions">
                <button
                  className="btn reschedule"
                  onClick={() => handleReschedule(a.id)}
                >
                  <FaEdit /> Reschedule
                </button>
                <button
                  className="btn cancel"
                  onClick={() => handleCancel(a.id)}
                >
                  <FaTimes /> Cancel
                </button>
                <button
                  className="btn checkin"
                  onClick={() => handleCheckIn(a.id)}
                >
                  <FaCheckCircle /> Check-In
                </button>
              </div>

              {/* Reschedule Modal */}
              {rescheduleModal === a.id && (
                <div className="reschedule-modal">
                  <div className="modal-content">
                    <h3>Reschedule Appointment</h3>
                    <label>New Date:</label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                    />
                    <label>New Time:</label>
                    <input
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                    />
                    <div className="modal-actions">
                      <button
                        className="btn save"
                        onClick={() => saveReschedule(a.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn cancel"
                        onClick={() => setRescheduleModal(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}