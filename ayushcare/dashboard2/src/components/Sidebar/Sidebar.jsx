import React from "react";
import "./Sidebar.css";
import { useMenu } from "../../context/MenuContext";
import {
  MdDashboard,
  MdPeople,
  MdEvent,
  MdLocalHospital,
  MdAssignment,
  MdNotificationsActive,
  MdSettings,
} from "react-icons/md";
import { FaUserMd, FaRegSmile } from "react-icons/fa";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const { activeItem, setActiveItem } = useMenu();

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
          <SidebarItem
            icon={<MdDashboard />}
            active={activeItem === "dashboard"}
            onClick={() => setActiveItem("dashboard")}
          />
          <SidebarItem
            icon={<FaUserMd />}
            active={activeItem === "doctor"}
            onClick={() => setActiveItem("doctor")}
          />
          <SidebarItem
            icon={<MdEvent />}
            active={activeItem === "appointments"}
            onClick={() => setActiveItem("appointments")}
          />
          <SidebarItem
            icon={<MdPeople />}
            active={activeItem === "patients"}
            onClick={() => setActiveItem("patients")}
          />
          <SidebarItem
            icon={<MdLocalHospital />}
            active={activeItem === "therapy"}
            onClick={() => setActiveItem("therapy")}
          />
          <SidebarItem
            icon={<MdAssignment />}
            active={activeItem === "docs"}
            onClick={() => setActiveItem("docs")}
          />
          <SidebarItem
            icon={<MdNotificationsActive />}
            active={activeItem === "notifications"}
            onClick={() => setActiveItem("notifications")}
          />
          <SidebarItem
            icon={<MdSettings />}
            active={activeItem === "settings"}
            onClick={() => setActiveItem("settings")}
          />
          <SidebarItem
            icon={<FaRegSmile />}
            active={activeItem === "feedback"}
            onClick={() => setActiveItem("feedback")}
          />
        </div>

        {/* bottom avatar */}
        <div className="sidebar-bottom">
          <div className="sidebar-avatar">
            <span>M</span>
          </div>
          <span className="sidebar-more">•••</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
