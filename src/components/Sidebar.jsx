import React, { useEffect } from "react";
import {
  FaTimes,
  FaTachometerAlt,
  FaCalendarAlt,
  FaChartLine,
  FaBell,
  FaFileInvoiceDollar,
  FaHistory,
  FaClinicMedical,
  FaCommentDots,
  FaUserCircle,
  FaHome,
  FaFileInvoice,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation
import "./Sidebar.css";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate(); // ✅ initialize navigation

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [sidebarOpen]);

  // ✅ Menu items with routes
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
      <aside
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        aria-hidden={!sidebarOpen}
      >
        <div className="sidebar-top">
          <h3>Panchakarma</h3>
          <button
            className="icon-btn close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        {/* ✅ Navigation with router */}
        <nav className="sidebar-nav">
          {items.map((it, i) => (
            <div
              key={i}
              className="sidebar-item"
              onClick={() => {
                navigate(it.path); // 🧭 Go to route
                setSidebarOpen(false); // close sidebar
              }}
            >
              <span className="sidebar-icon">{it.icon}</span>
              <span className="sidebar-text">{it.text}</span>
            </div>
          ))}
        </nav>

        <footer
          className="sidebar-footer"
          onClick={() => {
          navigate("/userprofile"); // ✅ navigate to User Profile page
          setSidebarOpen(false);
        }}>
          <div className="account-box">
          <FaUserCircle className="account-icon" />
            <div className="account-text">
              <h4>Account Details</h4>
              <p>View & Edit Profile</p>
            </div>
          </div>
        </footer>
      </aside>
    </div>
  );
}
