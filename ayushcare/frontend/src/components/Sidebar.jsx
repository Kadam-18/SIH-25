import React, { useEffect } from "react";
import {
  FaTimes,
  FaCalendarAlt,
  FaChartLine,
  FaBell,
  FaFileInvoice,
  FaHistory,
  FaClinicMedical,
  FaCommentDots,
  FaHome,
  FaUserCircle,
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
    { icon: <FaFileInvoice />, text: "Billing & Invoices", path: "/billing" },
    { icon: <FaHistory />, text: "Patient History", path: "/patienthistory" },
    { icon: <FaClinicMedical />, text: "Panchakarma Centres", path: "/centres" },
    { icon: <FaCommentDots />, text: "Feedback", path: "/feedback" },
  ];

  return (
    <>
      <div
        className={`sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* == Profile Header Section == */}
        <div
          className="profile-section"
          onClick={() => {
            navigate("/userprofile");
            setSidebarOpen(false);
          }}
        >
          <FaUserCircle className="sidebar-profile-icon" />
          <h2>MY PROFILE</h2>
          <p>View/edit</p>
        </div>

        {/* Close Button */}
        <button
          className="close-btn"
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(false);
          }}
        >
          <FaTimes />
        </button>

        {/* Menu with bar containers */}
        <nav className="sidebar-nav">
          {items.map((it, i) => (
            <div
              key={i}
              className="sidebar-item-container"
              onClick={() => {
                navigate(it.path);
                setSidebarOpen(false);
              }}
            >
              <div className="menu-bar">
                <span className="sidebar-icon">{it.icon}</span>
                <span className="sidebar-text">{it.text}</span>
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
