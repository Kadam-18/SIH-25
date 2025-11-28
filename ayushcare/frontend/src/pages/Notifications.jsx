import React, { useState, useEffect } from "react";
import "./Notifications.css";
import { FiBell, FiX } from "react-icons/fi";

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Upcoming Therapy Session",
      message: "Your Abhyanga therapy is scheduled for tomorrow at 10:00 AM.",
      time: "2h ago",
      date: "today",
      new: true,
    },
    {
      id: 2,
      title: "Post-Therapy Reminder",
      message:
        "Please avoid cold food and rest adequately for 24 hours after your therapy.",
      time: "1 day ago",
      date: "week",
      new: false,
    },
    {
      id: 3,
      title: "New Wellness Tip",
      message:
        "Stay hydrated! Warm water helps maintain dosha balance post therapy.",
      time: "3 days ago",
      date: "week",
      new: false,
    },
  ]);

  // Simulate loading animation
  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Filtering logic
  const filteredNotifications =
    activeFilter === "all"
      ? notifications
      : notifications.filter((n) => n.date === activeFilter);

  // Dismiss Notification
  const dismissNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  // Add new notification
  const triggerNewNotification = () => {
    const newItem = {
      id: Date.now(),
      title: "New Update Arrived",
      message: "You have a new wellness message.",
      time: "just now",
      date: "today",
      new: true,
    };
    setNotifications((prev) => [newItem, ...prev]);
  };

  return (
    <div className="notifications-bg">
      <div className="notifications-page">
        {/* Floating Bell Icon */}
        <div className="bell-background">
          <FiBell />
        </div>

        {/* Page Title */}
        <h2 className="notifications-title">
          <FiBell className="title-bell" /> Notifications
        </h2>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={activeFilter === "today" ? "active" : ""}
            onClick={() => setActiveFilter("today")}
          >
            Today
          </button>
          <button
            className={activeFilter === "week" ? "active" : ""}
            onClick={() => setActiveFilter("week")}
          >
            Week
          </button>
          <button
            className={activeFilter === "all" ? "active" : ""}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
        </div>

        {/* Loading Animation */}
        {loading && <div className="loading-ring"></div>}

        {/* Notification List */}
        {!loading && filteredNotifications.length > 0 ? (
          <ul className="notifications-list">
            {filteredNotifications.map((n, index) => (
              <li
              key={n.id}
               className={`notification-card ${index % 2 === 0 ? "left" : "right"} ${n.new ? "new-card" : ""}`}
               style={{ animationDelay: `${index * 0.15}s` }}
               >
                


                {n.new && <span className="pulse-dot"></span>}

                <div className="notification-header">
                  <h3>{n.title}</h3>

                  <div className="right-info">
                    <span className="time">{n.time}</span>

                    <FiX
                      className="dismiss-btn"
                      onClick={() => dismissNotification(n.id)}
                    />
                  </div>
                </div>

                <p>{n.message}</p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && (
            <div className="empty-container">
              <FiBell className="empty-bell" />
              <h3>No Notices Right Now!</h3>
              <p>You’re all caught up 😊</p>
            </div>
          )
        )}

        {/* Add New Notification Button */}
        <button className="add-new-btn" onClick={triggerNewNotification}>
          Add New Notification
        </button>
      </div>
    </div>
  );
};

export default Notifications;
