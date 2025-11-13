import React, { useState, useEffect } from "react";
import "./Notifications.css";

const Notifications = () => {
  // sample mock notifications (you can fetch real data later)
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

  // optional: future dynamic fetching from backend
  useEffect(() => {
    // fetch("/api/notifications").then(res => res.json()).then(setNotifications);
  }, []);

  return (
    <div className="notifications-container">
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
        <p className="no-notifications">No notifications available.</p>
      )}
    </div>
  );
};

export default Notifications;
