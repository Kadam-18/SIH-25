// src/pages/Userprofile.jsx
import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEdit, FaSave } from "react-icons/fa";
import "./UserProfile.css";
import { apiGet } from "../api";

export default function UserProfile() {
  const token = localStorage.getItem("token");

  const [personalInfo, setPersonalInfo] = useState({
    full_name: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
  });

  const [medicalInfo, setMedicalInfo] = useState({
    blood_group: "",
    height: "",
    weight: "",
    allergies: "",
    current_health_condition: "",
    current_medication: "",
    past_medical_history: [],
    blood_pressure: "",
    pulse_rate: "",
    stress_level: "",
    energy_level: "",
    lifestyle_addictions: "",
    contraindications: [],
    treatment_goals: [],
  });

  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingMedical, setEditingMedical] = useState(false);

  const [bmi, setBmi] = useState(0);
  const [age, setAge] = useState(0);


  useEffect(() => {
    const load = async () => {
      if (!token) return;
      const res = await apiGet("/api/patient/profile/", token);
      if (res && res.success && res.data) {
        const d = res.data;
        setPersonalInfo({
          full_name: d.full_name || "",
          gender: d.gender || "",
          dob: d.dob || "",
          email: d.user_email || d.email || "",
          phone: d.phone || "",
          address: d.address || "",
        });

        setMedicalInfo({
          blood_group: d.blood_group || "",
          height: d.height || d.height_cm || "",
          weight: d.weight || d.weight_kg || "",
          allergies: d.allergies || "",
          current_health_condition: d.current_symptoms || "",
          current_medication: d.current_medication || "",
          past_medical_history: d.past_medical_history || [],
          blood_pressure: d.blood_pressure || "",
          pulse_rate: d.pulse_rate || "",
          stress_level: d.stress_level || "",
          energy_level: d.energy_level || "",
          lifestyle_addictions: Array.isArray(d.addictions) ? d.addictions.join(", ") : (d.addictions || ""),
          contraindications: d.contraindications || [],
          treatment_goals: d.treatment_goals || [],
        });
      }
    };
    load();
  }, [token]);

  useEffect(() => {
    const h = medicalInfo.height / 100;
    setBmi((medicalInfo.weight / (h * h)).toFixed(1));
  }, [medicalInfo.height, medicalInfo.weight]);

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
      <div className="profile-header">
        <FaUserCircle className="avatar" />
        <div>
          <h1>My Profile</h1>
          <p className="muted">Manage your personal and medical details.</p>
        </div>
      </div>

      <div className="profile-card">
        <div className="card-header">
          <h2>🧍 Personal Information</h2>
          {!editingPersonal ? (
            <button className="edit-btn" onClick={() => setEditingPersonal(true)}>
              <FaEdit /> Edit
            </button>
          ) : (
            <button className="save-btn" onClick={() => setEditingPersonal(false)}>
              <FaSave /> Save Changes
            </button>
          )}
        </div>

        <div className="form-grid">
          <div>
            <label>Full Name</label>
            <input type="text" name="full_name" value={personalInfo.full_name} onChange={handlePersonalChange} readOnly={!editingPersonal} />
          </div>

          <div>
            <label>Gender</label>
            <select name="gender" value={personalInfo.gender} onChange={handlePersonalChange} disabled={!editingPersonal}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label>Date of Birth</label>
            <input type="date" name="dob" value={personalInfo.dob} onChange={handlePersonalChange} readOnly={!editingPersonal} />
          </div>

          <div>
            <label>Email</label>
            <input type="email" name="email" value={personalInfo.email} readOnly />
          </div>

          <div>
            <label>Phone Number</label>
            <input type="text" name="phone" value={personalInfo.phone} onChange={handlePersonalChange} readOnly={!editingPersonal} />
          </div>

          <div className="full-width">
            <label>Address</label>
            <textarea name="address" value={personalInfo.address} onChange={handlePersonalChange} readOnly={!editingPersonal} />
          </div>
        </div>
      </div>

      <div className="profile-card">
        <div className="card-header">
          <h2>🧬 Medical Information</h2>
          {!editingMedical ? (
            <button className="edit-btn" onClick={() => setEditingMedical(true)}>
              <FaEdit /> Edit
            </button>
          ) : (
            <button className="save-btn" onClick={() => setEditingMedical(false)}>
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
            <select name="blood_group" value={medicalInfo.blood_group} onChange={handleMedicalChange} disabled={!editingMedical}>
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
            <input type="number" name="height" value={medicalInfo.height} onChange={handleMedicalChange} readOnly={!editingMedical} />
          </div>

          <div>
            <label>Weight (kg)</label>
            <input type="number" name="weight" value={medicalInfo.weight} onChange={handleMedicalChange} readOnly={!editingMedical} />
          </div>

          <div>
            <label>BMI</label>
            <input type="text" value={bmi} readOnly />
          </div>

          <div>
            <label>Allergies</label>
            <input type="text" name="allergies" value={medicalInfo.allergies} onChange={handleMedicalChange} readOnly={!editingMedical} />
          </div>

          <div>
            <label>Current Condition</label>
            <input type="text" name="current_health_condition" value={medicalInfo.current_health_condition} onChange={handleMedicalChange} readOnly={!editingMedical} />
          </div>

          <div>
            <label>Current Medication</label>
            <input type="text" name="current_medication" value={medicalInfo.current_medication} onChange={handleMedicalChange} readOnly={!editingMedical} />
          </div>

          {medicalInfo.past_medical_history && medicalInfo.past_medical_history.length > 0 && (
            <div className="full-width">
              <label>Past Medical History</label>
              <div className="chip-list">
                {medicalInfo.past_medical_history.map((item, idx) => (
                  <span key={idx} className="chip">{item}</span>
                ))}
              </div>
            </div>
          )}

          {medicalInfo.blood_pressure && (
            <div>
              <label>Blood Pressure</label>
              <input type="text" value={medicalInfo.blood_pressure} readOnly />
            </div>
          )}

          {medicalInfo.pulse_rate && (
            <div>
              <label>Pulse Rate</label>
              <input type="text" value={medicalInfo.pulse_rate} readOnly />
            </div>
          )}

          {medicalInfo.lifestyle_addictions && (
            <div className="full-width">
              <label>Lifestyle / Addictions</label>
              <input type="text" value={medicalInfo.lifestyle_addictions} readOnly />
            </div>
          )}

          {medicalInfo.contraindications && medicalInfo.contraindications.length > 0 && (
            <div className="full-width">
              <label>Contraindications</label>
              <div className="chip-list">
                {medicalInfo.contraindications.map((item, idx) => (
                  <span key={idx} className="chip">{item}</span>
                ))}
              </div>
            </div>
          )}

          {medicalInfo.treatment_goals && medicalInfo.treatment_goals.length > 0 && (
            <div className="full-width">
              <label>Treatment Goals</label>
              <div className="chip-list">
                {medicalInfo.treatment_goals.map((item, idx) => (
                  <span key={idx} className="chip">{item}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
