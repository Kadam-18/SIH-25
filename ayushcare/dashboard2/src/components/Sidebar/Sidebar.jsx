import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { useAuth } from "../../context/AuthContext";
import {
  MdDashboard,
  MdPeople,
  MdEvent,
  MdAssignment,
} from "react-icons/md";
import { FaUserMd } from "react-icons/fa";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, name } = useAuth();

  // Doctor menu items
  const doctorMenuItems = [
    { id: "dashboard", icon: <MdDashboard />, path: "/doctor", label: "Dashboard" },
    { id: "appointments", icon: <MdEvent />, path: "/doctor/appointments", label: "Appointments" },
    { id: "patients", icon: <MdPeople />, path: "/doctor/patients", label: "Patient History" },
    { id: "therapists", icon: <FaUserMd />, path: "/doctor/therapists", label: "Therapist Details" },
  ];

  // Therapist menu items
  const therapistMenuItems = [
    { id: "dashboard", icon: <MdDashboard />, path: "/therapist", label: "Dashboard" },
    { id: "schedule", icon: <MdEvent />, path: "/therapist/schedule", label: "Appointments" },
    { id: "patients", icon: <MdPeople />, path: "/therapist/patients", label: "Patient Details" },
    { id: "docs", icon: <MdAssignment />, path: "/therapist/docs", label: "Procedure Docs" },
  ];

  const menuItems = role === "doctor" ? doctorMenuItems : therapistMenuItems;

  const getActiveItem = () => {
    const path = location.pathname;
    const item = menuItems.find(item => item.path === path);
    return item ? item.id : "dashboard";
  };

  const handleItemClick = (path) => {
    navigate(path);
  };

  const getInitials = () => {
    if (name) {
      return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }
    return role === "doctor" ? "DR" : "TH";
  };

  return (
    <aside className="sidebar-root">
      <div className="sidebar-inner">
        {/* top dots */}
        <div className="sidebar-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>

        <div className="sidebar-items">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              active={getActiveItem() === item.id}
              onClick={() => handleItemClick(item.path)}
              label={item.label}
            />
          ))}
        </div>

        {/* bottom avatar */}
        <div className="sidebar-bottom">
          <div className="sidebar-avatar">
            <span>{getInitials()}</span>
          </div>
          <span className="sidebar-more">•••</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
