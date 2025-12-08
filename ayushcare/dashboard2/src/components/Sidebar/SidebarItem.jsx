import React from "react";

const SidebarItem = ({ icon, active, onClick }) => {
  return (
    <button
      className={`sidebar-item ${active ? "active" : ""}`}
      onClick={onClick}
      type="button"
    >
      {icon}
    </button>
  );
};

export default SidebarItem;
