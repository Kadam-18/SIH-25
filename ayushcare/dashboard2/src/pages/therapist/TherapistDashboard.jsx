import React from "react";
import AppointmentCard from "../../components/Cards/AppointmentCard";
import { therapistQuickStats } from "../../utils/roleMenus";
import "./TherapistPages.css";

const TherapistDashboard = () => {
  return (
    <div className="page-root">
      <h2 className="page-title">Overview</h2>

      <div className="grid-3">
        {therapistQuickStats.map((item) => (
          <AppointmentCard
            key={item.label}
            title={item.label}
            count={item.value}
            subtitle="Updated today"
          />
        ))}
      </div>

      <section className="section-block">
        <h3 className="section-title">Reminder</h3>
        <p className="section-text">
          Ensure pre- and post-procedure instructions are clearly communicated
          to all patients before and after therapy sessions.
        </p>
      </section>
    </div>
  );
};

export default TherapistDashboard;
