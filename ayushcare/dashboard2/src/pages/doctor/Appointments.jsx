import React from "react";
import PatientCard from "../../components/Cards/PatientCard";
import "./DoctorPages.css";

const mockAppointments = [
  { name: "Anita Verma", therapy: "Virechana – Follow up", time: "10:00 AM" },
  { name: "Rahul Singh", therapy: "Basti – Session 2", time: "11:30 AM" },
  { name: "Meera Nair", therapy: "Nasya – First visit", time: "02:15 PM" },
];

const Appointments = () => {
  return (
    <div className="page-root">
      <h2 className="page-title">Today&apos;s Appointments</h2>

      <div className="grid-3">
        {mockAppointments.map((appt) => (
          <PatientCard
            key={appt.name}
            name={appt.name}
            therapy={appt.therapy}
            time={appt.time}
          />
        ))}
      </div>
    </div>
  );
};

export default Appointments;
