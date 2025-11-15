import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEdit, FaSave } from "react-icons/fa";
import "./UserProfile.css";

export default function UserProfile() {
  // ---------- Personal Info ----------
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Anirudh Yadav",
    gender: "Male",
    dob: "1998-10-12",
    email: "anirudh@example.com",
    phone: "+91 98765 43210",
    address: "Bhopal, Madhya Pradesh, India",
  });

  const [editingPersonal, setEditingPersonal] = useState(false);

  // ---------- Medical Info ----------
  const [medicalInfo, setMedicalInfo] = useState({
    bloodGroup: "B+",
    height: 175,
    weight: 68,
    allergy: "None",
    condition: "Healthy",
    medication: "Ayurvedic",
  });

  const [editingMedical, setEditingMedical] = useState(false);
  const [bmi, setBmi] = useState(0);
  const [age, setAge] = useState(0);

  // Calculate BMI dynamically
  useEffect(() => {
    if (medicalInfo.height && medicalInfo.weight) {
      const h = medicalInfo.height / 100;
      const calc = (medicalInfo.weight / (h * h)).toFixed(1);
      setBmi(calc);
    }
  }, [medicalInfo.height, medicalInfo.weight]);

  // Calculate age from DOB
  useEffect(() => {
    if (personalInfo.dob) {
      const birth = new Date(personalInfo.dob);
      const today = new Date();
      let userAge = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        userAge--;
      }
      setAge(userAge);
    }
  }, [personalInfo.dob]);

  // Handle changes
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleMedicalChange = (e) => {
    const { name, value } = e.target;
    setMedicalInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-root">
      {/* Profile Header */}
      <div className="profile-header">
        <FaUserCircle className="avatar" />
        <div>
          <h1>My Profile</h1>
          <p className="muted">Manage your personal and medical details.</p>
        </div>
      </div>

      {/* Personal Info Card */}
      <div className="profile-card">
        <div className="card-header">
          <h2>🧍 Personal Information</h2>
          {!editingPersonal ? (
            <button
              className="edit-btn"
              onClick={() => setEditingPersonal(true)}
            >
              <FaEdit /> Edit
            </button>
          ) : (
            <button
              className="save-btn"
              onClick={() => setEditingPersonal(false)}
            >
              <FaSave /> Save Changes
            </button>
          )}
        </div>

        <div className="form-grid">
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={personalInfo.fullName}
              onChange={handlePersonalChange}
              readOnly={!editingPersonal}
            />
          </div>

          <div>
            <label>Gender</label>
            <select
              name="gender"
              value={personalInfo.gender}
              onChange={handlePersonalChange}
              disabled={!editingPersonal}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={personalInfo.dob}
              onChange={handlePersonalChange}
              readOnly={!editingPersonal}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handlePersonalChange}
              readOnly={!editingPersonal}
            />
          </div>

          <div>
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={personalInfo.phone}
              onChange={handlePersonalChange}
              readOnly={!editingPersonal}
            />
          </div>

          <div className="full-width">
            <label>Address</label>
            <textarea
              name="address"
              value={personalInfo.address}
              onChange={handlePersonalChange}
              readOnly={!editingPersonal}
            />
          </div>
        </div>
      </div>

      {/* Medical Info Card */}
      <div className="profile-card">
        <div className="card-header">
          <h2>🧬 Medical Information</h2>
          {!editingMedical ? (
            <button
              className="edit-btn"
              onClick={() => setEditingMedical(true)}
            >
              <FaEdit /> Edit
            </button>
          ) : (
            <button
              className="save-btn"
              onClick={() => setEditingMedical(false)}
            >
              <FaSave /> Save Changes
            </button>
          )}
        </div>

        <div className="form-grid">
          <div>
            <label>Age</label>
            <input type="number" value={age} readOnly />
          </div>

          <div>
            <label>Blood Group</label>
            <select
              name="bloodGroup"
              value={medicalInfo.bloodGroup}
              onChange={handleMedicalChange}
              disabled={!editingMedical}
            >
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          <div>
            <label>Height (cm)</label>
            <input
              type="number"
              name="height"
              value={medicalInfo.height}
              onChange={handleMedicalChange}
              readOnly={!editingMedical}
            />
          </div>

          <div>
            <label>Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={medicalInfo.weight}
              onChange={handleMedicalChange}
              readOnly={!editingMedical}
            />
          </div>

          <div>
            <label>BMI</label>
            <input type="text" value={bmi} readOnly />
          </div>

          <div>
            <label>Allergy</label>
            <input
              type="text"
              name="allergy"
              value={medicalInfo.allergy}
              onChange={handleMedicalChange}
              readOnly={!editingMedical}
            />
          </div>

          <div>
            <label>Current Condition</label>
            <input
              type="text"
              name="condition"
              value={medicalInfo.condition}
              onChange={handleMedicalChange}
              readOnly={!editingMedical}
            />
          </div>

          <div>
            <label>Current Medication</label>
            <select
              name="medication"
              value={medicalInfo.medication}
              onChange={handleMedicalChange}
              disabled={!editingMedical}
            >
              <option>Ayurvedic</option>
              <option>Allopathic</option>
              <option>Both</option>
              <option>None</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}