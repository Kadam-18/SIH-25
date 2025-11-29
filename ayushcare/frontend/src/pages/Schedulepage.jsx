import React, { useState } from "react";
import Calendar from "react-calendar"; 
import "react-calendar/dist/Calendar.css";
import "./SchedulePage.css";

export default function SchedulePage() {
  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");

  const initialAppointments = [
    { id: 1, type: "Morning", time: "9:00 AM – 12:00 PM", slots: ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM"] },
    { id: 2, type: "Evening", time: "5:00 PM – 9:00 PM", slots: ["5:00 PM","5:10 PM","5:20 PM","5:30 PM","6:00 PM","6:10 PM","6:20 PM"] },
  ];

  return (
    <div className="schedule-container">

      {/* LEFT SIDE CALENDAR */}
    <div className="calendar-container">
      <h3 className="calendar-title">Appointments</h3>

      <Calendar onChange={setDate} value={date} />

      <div className="selected-date-box">
        Selected Date: <br />
        {date.toDateString()}
      </div>
    </div>


      {/* RIGHT SIDE SLOTS */}
      <div className="slots-section">
        <h2 className="page-title">Available Slots</h2>

        {initialAppointments.map((session) => (
          <div key={session.id} className="session-card">
            <div className="session-header">
              <h3>{session.type}</h3>
              <span className="session-time">{session.time}</span>
            </div>

            <div className="slots-grid">
              {session.slots.map((t) => (
                <button
                  key={t}
                  className={`slot-btn ${selectedSlot === t ? "active" : ""}`}
                  onClick={() => setSelectedSlot(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="waiting">
          <p>Waiting List</p>
          <button className="wait-btn">+ Add to Waiting List</button>
        </div>
      </div>
    </div>
  );
}
