import React from "react";
import { FaBars, FaHome, FaSearch, FaUserCircle } from "react-icons/fa";

/**
 * Navbar component:
 * - shows hamburger when sidebar is closed (left side)
 * - when closed it shows Home icon and centered search bar and Login/Signup on right
 */
export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        {/* If sidebar is closed show hamburger to open it */}
        {!sidebarOpen ? (
          <button
            className="icon-btn"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars size={20} />
          </button>
        ) : (
          /* when sidebarOpen is true, show a Home icon (as requested) */
          <div className="home-icon">
            <FaHome size={20} />
            <span className="home-text">Home</span>
          </div>
        )}
      </div>

      {/* Search bar centered and takes 60% width */}
      <div className="navbar-center">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            className="search-input"
            placeholder="Search Panchakarma therapies, centres..."
          />
        </div>
      </div>

      {/* Right: Login / Signup (simple button) */}
      <div className="navbar-right">
        <button className="btn-outline">
          <FaUserCircle style={{ marginRight: 8 }} />
          Login / Signup
        </button>
      </div>
    </header>
  );
}