import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import "./UserProfile.css";

export default function UserProfile() {
  const [personalInfo] = useState({
    fullName: "Anirudh Yadav",
    phone: "+91 98765 43210",
    email: "anirudh@example.com",
    gender: "Male",
    dob: "1998-10-12",
    address: "Bhopal, Madhya Pradesh, India",
  });

  const [medicalInfo] = useState({
    bloodGroup: "B+",
    height: 175,
    weight: 68,
    allergy: "None",
    condition: "Healthy",
    medication: "Ayurvedic",
  });

  const [editing, setEditing] = useState(false);
  const [bmi, setBmi] = useState(0);

  useEffect(() => {
    const h = medicalInfo.height / 100;
    setBmi((medicalInfo.weight / (h * h)).toFixed(1));
  }, [medicalInfo.height, medicalInfo.weight]);

  return (
    <div className="user-profile-container">
      {/* Main Content */}
      <div className="profile-wrapper">
        {/* LEFT PROFILE CARD */}
        <div className="profile-left redesigned-card">
          <div className="photo-container">
            <FaUserCircle className="profile-big-photo" />
          </div>

          <h3 className="profile-title">My Profile</h3>

          <div className="info-line bold">{personalInfo.fullName}</div>
          <div className="info-line">{personalInfo.phone}</div>
          <div className="info-line">{personalInfo.email}</div>

          <button className="save-edit-btn" onClick={() => setEditing(!editing)}>
            <FaEdit /> {editing ? "Save" : "Edit"}
          </button>
        </div>

        {/* RIGHT PROFILE CARDS */}
        <div className="profile-right">
          {/* GENERAL INFO */}
          {/* GENERAL INFO */}
      <div className="info-box equal-height">
        <h3 className="header-title">General Information</h3>

        <div className="info-grid boxed">
          <div className="detail-box"><label>Full Name</label><span>{personalInfo.fullName}</span></div>
          <div className="detail-box"><label>Phone</label><span>{personalInfo.phone}</span></div>
          <div className="detail-box"><label>Email</label><span>{personalInfo.email}</span></div>
          <div className="detail-box"><label>Gender</label><span>{personalInfo.gender}</span></div>
          <div className="detail-box"><label>Date of Birth</label><span>{personalInfo.dob}</span></div>
          {/* Address moved here and spans 2 columns instead of full width */}
          <div className="detail-box full"><label>Address</label><span>{personalInfo.address}</span></div>
        </div>
      </div>

          {/* MEDICAL INFO */}
          <div className="info-box equal-height">
            <h3 className="header-title">Medical Information</h3>

            <div className="info-grid boxed">
              <div className="detail-box"><label>Blood Group</label><span>{medicalInfo.bloodGroup}</span></div>
              <div className="detail-box"><label>Height</label><span>{medicalInfo.height} cm</span></div>
              <div className="detail-box"><label>Weight</label><span>{medicalInfo.weight} kg</span></div>
              <div className="detail-box"><label>Allergy</label><span>{medicalInfo.allergy}</span></div>
              <div className="detail-box"><label>Condition</label><span>{medicalInfo.condition}</span></div>
              <div className="detail-box"><label>Medication</label><span>{medicalInfo.medication}</span></div>
              <div className="detail-box"><label>BMI</label><span>{bmi}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}