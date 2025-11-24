import React, { useEffect } from "react";
import {
  FaTimes,
  FaCalendarAlt,
  FaChartLine,
  FaBell,
  FaFileInvoiceDollar,
  FaHistory,
  FaClinicMedical,
  FaCommentDots,
  FaUserCircle,
  FaHome,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (sidebarOpen) document.body.classList.add("sidebar-open");
    else document.body.classList.remove("sidebar-open");
  }, [sidebarOpen]);

  const items = [
    { icon: <FaHome />, text: "Home", path: "/home" },
    { icon: <FaCalendarAlt />, text: "Schedule", path: "/schedule" },
    { icon: <FaChartLine />, text: "Progress Tracking", path: "/progress" },
    { icon: <FaBell />, text: "Notifications", path: "/notifications" },
    { icon: <FaFileInvoiceDollar />, text: "Billing & Invoices", path: "/billing" },
    { icon: <FaHistory />, text: "Patient History", path: "/patienthistory" },
    { icon: <FaClinicMedical />, text: "Panchakarma Centres", path: "/centres" },
    { icon: <FaCommentDots />, text: "Feedback", path: "/feedback" },
  ];

  return (
    <div>
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Container */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        
        {/* Profile Header */}
        <div
          className="profile-header"
          onClick={() => {
            navigate("/userprofile");
            setSidebarOpen(false);
          }}
        >
          <FaUserCircle className="profile-icon" />
          <h3 className="profile-title">MY PROFILE</h3>
          <p className="profile-sub">View / Edit</p>

          <button
            className="close-btn"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(false);
            }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="sidebar-nav">
          {items.map((it, i) => (
            <div
              key={i}
              className="sidebar-item"
              onClick={() => {
                navigate(it.path);
                setSidebarOpen(false);
              }}
            >
              <span className="sidebar-icon">{it.icon}</span>
              <span className="sidebar-text">{it.text}</span>
            </div>
          ))}
        </nav>

      </aside>
    </div>
  );
}
