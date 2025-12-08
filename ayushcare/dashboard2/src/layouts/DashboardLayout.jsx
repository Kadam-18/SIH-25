import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="layout-root">
      <Sidebar />
      <div className="layout-main">
        <Navbar />
        <main className="layout-content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
