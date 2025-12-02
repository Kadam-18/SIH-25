import React, { useState, useEffect } from "react";
import "./Notifications.css";
import { FiBell } from "react-icons/fi";
import { apiGet } from "../api";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiGet("/api/notifications/my/", token);
      
      if (res && Array.isArray(res)) {
        setNotifications(res);
      } else {
        console.error("Unexpected notifications response:", res);
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="notifications-root">
        <h2 className="noti-title">NOtIfIcAtIoNs 🔔</h2>
        <p>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="notifications-root">
      <h2 className="noti-title">notifications </h2>

      {notifications.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>No notifications yet. You'll see updates about your appointments here!</p>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map((n, index) => (
            <div
              key={n.id}
              className={`noti-card ${index % 2 === 0 ? "left" : "right"}`}
            >
              <h3>{n.title}</h3>
              <p style={{ whiteSpace: "pre-line" }}>{n.message}</p>
              <span className="time">{n.time_ago || "Just now"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;