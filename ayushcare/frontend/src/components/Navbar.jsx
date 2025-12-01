import React, { useState } from "react";
import { FaBars, FaHome, FaSearch, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Navbar.css";

export default function Navbar({ sidebarOpen, setSidebarOpen, userName = "Mahi Sharma" }) {
  const navigate = useNavigate();
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const handleLogout = () => {
    // Clear tokens
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    
    // Show success message
    toast.success("Logged out successfully");
    
    // Redirect to login
    navigate("/login");
  };

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
      <div className="navbar-right">
        <div 
          className="account-btn"
          onClick={() => setShowLogoutMenu(!showLogoutMenu)}
        >
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
        
        {showLogoutMenu && (
          <div className="logout-menu">
            <button 
              className="logout-menu-item"
              onClick={() => {
                navigate("/userprofile");
                setShowLogoutMenu(false);
              }}
            >
              <FaUserCircle /> Profile
            </button>
            <button 
              className="logout-menu-item logout-btn"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
