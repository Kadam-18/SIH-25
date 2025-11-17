import React, { useState, useEffect } from "react";
import "./Notifications.css";
import { FiBell } from "react-icons/fi";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Upcoming Therapy Session",
      message: "Your Abhyanga therapy is scheduled for tomorrow at 10:00 AM.",
      time: "2h ago",
    },
    {
      id: 2,
      title: "Post-Therapy Reminder",
      message:
        "Please avoid cold food and rest adequately for 24 hours after your therapy.",
      time: "1 day ago",
    },
    {
      id: 3,
      title: "New Wellness Tip",
      message:
        "Stay hydrated! Warm water helps maintain dosha balance post therapy.",
      time: "3 days ago",
    },
  ]);

  return (
    <div className="notifications-page">

      {/* Background Icon */}
      <div className="bell-background">
        <FiBell />
      </div>

      <h2 className="notifications-title">Notifications</h2>

      {notifications.length > 0 ? (
        <ul className="notifications-list">
          {notifications.map((n) => (
            <li key={n.id} className="notification-card">
              <div className="notification-header">
                <h3>{n.title}</h3>
                <span className="time">{n.time}</span>
              </div>
              <p>{n.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-container">
          <FiBell className="empty-bell" />
          <h3>No Notices Right Now!</h3>
          <p>You’re all caught up 😊</p>

          <button className="back-btn">View Dashboard</button>
        </div>
      )}
    </div>
  );
};

export default Notifications;

