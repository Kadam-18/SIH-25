import React from "react";
import { FaBars, FaHome, FaSearch, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ sidebarOpen, setSidebarOpen, userName = "Mahi Sharma" }) {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      {/* LEFT: menu / home */}
      <div className="navbar-left">
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

      {/* CENTER: search */}
      <div className="navbar-center">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            className="search-input"
            placeholder="Search Panchakarma therapies, centres..."
          />
        </div>
      </div>

      {/* RIGHT: profile icon + name */}
      <div
        className="navbar-right"
        onClick={() => navigate("/userprofile")}
      >
        <div className="account-btn">
          <div className="avatar-circle">
            {/* later you can replace false with check for user photo */}
            {false ? (
              <img src="/user-photo.jpg" alt="User" className="avatar-img" />
            ) : (
              <FaUserCircle className="default-avatar" />
            )}
          </div>
          <span className="user-name">{userName}</span>
          <span className="dots">...</span>
        </div>
      </div>
    </header>
  );
}
