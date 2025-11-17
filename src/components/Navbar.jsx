import React from "react";
import { FaBars, FaHome, FaSearch, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import "./Navbar.css";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate(); // ✅ Initialize navigate()

  return (
    <header className="navbar">
      <div className="navbar-left">
        {/* Hamburger or Home icon depending on sidebar state */}
        {!sidebarOpen ? (
          <button
            className="icon-btn"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars size={20} />
          </button>
        ) : (
          <div className="home-icon">
            <FaHome size={20} />
            <span className="home-text">Home</span>
          </div>
        )}
      </div>

      {/* Search bar centered */}
      <div className="navbar-center">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            className="search-input"
            placeholder="Search Panchakarma therapies, centres..."
          />
        </div>
      </div>

      {/* Login / Signup Button */}
      <div className="navbar-right">
        <button
          className="btn-outline"
          onClick={() => navigate("/login")} // ✅ Navigation handled here
        >
          <FaUserCircle style={{ marginRight: 8 }} />
          Login / Signup
        </button>
      </div>
    </header>
  );
}
