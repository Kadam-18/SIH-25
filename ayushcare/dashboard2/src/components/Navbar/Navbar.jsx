import React from "react";
import "./Navbar.css";
import { FiBell, FiSearch } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { role, switchRole } = useAuth();

  const handleRoleChange = (e) => {
    switchRole(e.target.value);
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
            placeholder="Search patients, therapies, appointments..."
          />
        </div>
      </div>

      <div className="navbar-right">
        <select
          className="role-select"
          value={role}
          onChange={handleRoleChange}
        >
          <option value="doctor">Doctor</option>
          <option value="therapist">Therapist</option>
        </select>

        <button className="icon-button">
          <FiBell />
        </button>

        <div className="avatar-circle">
          <span>M</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
