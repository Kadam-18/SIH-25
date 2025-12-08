import React from "react";
import "./Cards.css";

const PatientCard = ({ name, therapy, time }) => {
  return (
    <div className="card-root">
      <h3>{name}</h3>
      <p className="card-subtitle">{therapy}</p>
      <p className="card-meta">{time}</p>
    </div>
  );
};

export default PatientCard;
