import React from "react";
import "./TherapistPages.css";

const AssignedPatients = () => {
  return (
    <div className="page-root">
      <h2 className="page-title">Assigned Patients</h2>
      <div className="table-placeholder">
        <p>
          List of patients assigned to you along with therapy type and session
          status will be displayed here.
        </p>
      </div>
    </div>
  );
};

export default AssignedPatients;
