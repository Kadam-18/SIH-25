import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaHome, FaSearch, FaUserCircle, FaBell, FaChevronDown, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ sidebarOpen, setSidebarOpen, userName = "Mahi Sharma" }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleProfileClick = () => {
    navigate("/userprofile");
    setDropdownOpen(false);
  };

  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSettings = () => {
    navigate("/settings");
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

      {/* RIGHT: notification + profile */}
      <div className="navbar-right">
        {/* Notification Bell */}
        <div 
          className="notification-icon"
          onClick={handleNotificationClick}
          title="Notifications"
        >
          <FaBell size={20} />
          <span className="notification-badge">3</span>
        </div>

        {/* Profile with Dropdown */}
        <div className="profile-dropdown" ref={dropdownRef}>
          <div
            className="profile-section"
            onClick={toggleDropdown}
          >
            <div className="account-btn">
              <div className="avatar-circle">
                {false ? (
                  <img src="/user-photo.jpg" alt="User" className="avatar-img" />
                ) : (
                  <FaUserCircle className="default-avatar" />
                )}
              </div>
              <span className="user-name">{userName}</span>
              <FaChevronDown className={`dropdown-arrow ${dropdownOpen ? 'rotate' : ''}`} />
            </div>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={handleProfileClick}>
                <FaUser className="dropdown-icon" />
                <span>Profile</span>
              </div>
              <div className="dropdown-item" onClick={handleSettings}>
                <FaCog className="dropdown-icon" />
                <span>Settings</span>
              </div>
              <div className="dropdown-item" onClick={handleLogout}>
                <FaSignOutAlt className="dropdown-icon" />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}