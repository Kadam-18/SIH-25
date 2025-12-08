import React from "react";
import AppointmentCard from "../../components/Cards/AppointmentCard";
import { doctorQuickStats } from "../../utils/roleMenus";
import "./DoctorPages.css";

const DoctorDashboard = () => {
  return (
    <div className="page-root">
      <h2 className="page-title">Overview</h2>

      <div className="grid-3">
        {doctorQuickStats.map((item) => (
          <AppointmentCard
            key={item.label}
            title={item.label}
            count={item.value}
            subtitle="Updated today"
          />
        ))}
      </div>

      <section className="section-block">
        <h3 className="section-title">Quick Notes</h3>
        <p className="section-text">
          Review today&apos;s appointments and prescriptions to ensure a smooth
          Panchakarma experience for your patients.
        </p>
      </section>
    </div>
  );
};

export default DoctorDashboard;
