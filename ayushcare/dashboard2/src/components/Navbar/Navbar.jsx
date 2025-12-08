import React, { useState } from "react";
import "./Navbar.css";
import { FiBell, FiSearch, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { role, name, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = () => {
    if (name) {
      return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }
    return role === "doctor" ? "DR" : "TH";
  };

  return (
    <header className="navbar-root">
      <div className="navbar-left">
        <h1 className="navbar-title">
          AyushCare {role === "doctor" ? "Doctor" : "Therapist"} Dashboard
        </h1>
      </div>

      <div className="navbar-center">
        <div className="navbar-search">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search patient"
          />
        </div>
      </div>

      <div className="navbar-right">
        <button className="icon-button">
          <FiBell />
        </button>

        <div className="avatar-dropdown">
          <div 
            className="avatar-circle"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span>{getInitials()}</span>
          </div>
          
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <div className="dropdown-name">{name || (role === "doctor" ? "Doctor" : "Therapist")}</div>
                <div className="dropdown-role">{role === "doctor" ? "Doctor" : "Therapist"}</div>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={handleLogout}>
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
