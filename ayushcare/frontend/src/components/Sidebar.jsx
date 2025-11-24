import React, { useEffect } from "react";
import {
  FaTimes,
  FaCalendarAlt,
  FaChartLine,
  FaBell,
  FaHistory,
  FaClinicMedical,
  FaCommentDots,
  FaUserCircle,
  FaHome,
  FaFileInvoice,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [sidebarOpen]);

  const items = [
    { icon: <FaHome />, text: "Home", path: "/home" },
    { icon: <FaCalendarAlt />, text: "Schedule", path: "/schedule" },
    { icon: <FaChartLine />, text: "Progress Tracking", path: "/progress" },
    { icon: <FaBell />, text: "Notifications", path: "/notifications" },
    { icon: <FaFileInvoice />, text: "Billing & Invoices", path: "/billing" },
    { icon: <FaHistory />, text: "Patient History", path: "/patienthistory" },
    { icon: <FaClinicMedical />, text: "Panchakarma Centres", path: "/centres" },
    { icon: <FaCommentDots />, text: "Feedback", path: "/feedback" },
  ];

  return (
    <div>
      <div
        className={`sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div
          className="sidebar-top profile-header"
          onClick={() => {
            navigate("/userprofile");
            setSidebarOpen(false);
          }}
          style={{ cursor: "pointer" }}
        >
          <FaUserCircle className="profile-icon" />
          <div>
            <h3 className="profile-name">MY PROFILE</h3>
            <p className="profile-sub">View / Edit</p>
          </div>

          <button
            className="icon-btn close-btn"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(false);
            }}
          >
            <FaTimes />
          </button>
        </div>

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
