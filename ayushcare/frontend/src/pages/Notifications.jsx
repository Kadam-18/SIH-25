import React, { useState } from "react";
import "./Notifications.css";
import { FiBell } from "react-icons/fi";

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: "Upcoming Therapy Session",
      message: "Your Abhyanga therapy is scheduled for tomorrow at 10:00 AM.",
      time: "2h ago",
    },
    {
      id: 2,
      title: "Post-Therapy Reminder",
      message: "Please avoid cold food and rest adequately for 24 hours after your therapy.",
      time: "1 day ago",
    },
    {
      id: 3,
      title: "New Wellness Tip",
      message: "Stay hydrated! Warm water helps maintain dosha balance post therapy.",
      time: "3 days ago",
    },
  ]);

  return (
    <div className="notifications-root">
      <h2 className="noti-title">NOtIfIcAtIoNs 🔔</h2>

      <div className="notifications-list">
        {notifications.map((n, index) => (
          <div
            key={n.id}
            className={`noti-card ${index % 2 === 0 ? "left" : "right"}`}
          >
            <h3>{n.title}</h3>
            <p>{n.message}</p>
            <span className="time">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;