import React from "react";
import { FaTimes, FaTachometerAlt, FaCalendarAlt, FaChartLine, FaBell, FaFileInvoiceDollar, FaHistory, FaClinicMedical, FaCommentDots } from "react-icons/fa";

/**
 * Sidebar slides in from the left. Uses CSS transitions for smooth animation.
 * The sidebarOpen prop controls visibility.
 */
export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  // menu items array to keep code simple and editable
  const items = [
    { icon: <FaTachometerAlt />, text: "Dashboard" },
    { icon: <FaCalendarAlt />, text: "Schedule" },
    { icon: <FaChartLine />, text: "Progress Tracking" },
    { icon: <FaBell />, text: "Notifications" },
    { icon: <FaFileInvoiceDollar />, text: "Billing & Invoices" },
    { icon: <FaHistory />, text: "Patient History" },
    { icon: <FaClinicMedical />, text: "Panchakarma Centres" },
    { icon: <FaCommentDots />, text: "Feedback" },
  ];

  return (
    // overlay (semi-transparent) + sidebar container
    <div>
      <div
        className={`sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`} aria-hidden={!sidebarOpen}>
        <div className="sidebar-top">
          <h3>Panchakarma</h3>
          <button className="icon-btn close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          {items.map((it, i) => (
            <div key={i} className="sidebar-item" onClick={() => setSidebarOpen(false)}>
              <span className="sidebar-icon">{it.icon}</span>
              <span className="sidebar-text">{it.text}</span>
            </div>
          ))}
        </nav>

        <footer className="sidebar-footer muted">
          © {new Date().getFullYear()} Panchakarma Centre
        </footer>
      </aside>
    </div>
  );
}