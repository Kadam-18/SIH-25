import React from "react";
import PatientCard from "../../components/Cards/PatientCard";
import "./TherapistPages.css";

const mockSchedule = [
  { name: "Kiran Rao", therapy: "Abhyanga + Swedana", time: "09:30 AM" },
  { name: "Sanjay Patil", therapy: "Basti – Session 3", time: "11:00 AM" },
  { name: "Lata Mahajan", therapy: "Shirodhara", time: "03:00 PM" },
];

const TherapySchedule = () => {
  return (
    <div className="page-root">
      <h2 className="page-title">Today&apos;s Therapy Schedule</h2>
      <div className="grid-3">
        {mockSchedule.map((item) => (
          <PatientCard
            key={item.name}
            name={item.name}
            therapy={item.therapy}
            time={item.time}
          />
        ))}
      </div>
    </div>
  );
};

export default TherapySchedule;
