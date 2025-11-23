// src/pages/CompleteProfile.jsx
import React, { useEffect, useState } from "react";
import { apiPost, apiGet, apiPut } from "../api";
import { useNavigate, useLocation } from "react-router-dom";
import "./CompleteProfile.css";

export default function CompleteProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  // email passed from login (or fallback empty)
  const initialEmail = location.state?.email || "";

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    full_name: "",
    gender: "Male",
    dob: "",
    phone: "",
    email: initialEmail,
    address: "",
    marital_status: "Single",
    occupation: "",
    lifestyle: "Moderate",
    emergency_contact_name: "",
    emergency_contact_relation: "",
    emergency_contact_phone: "",

    // medical
    blood_group: "A+",
    height: "",
    weight: "",
    allergies: "",
    current_medication: "",
    past_medical_history: [], // multi-select
    appetite: "",
    digestion: "",
    bowel_habits: "",
    sleep_quality: "",
    stress_level: "",
    energy_level: "",
    menstrual_history: "",
    lifestyle_addictions: "",
    blood_pressure: "",
    pulse_rate: "",
    prakriti: "",
    vikriti: "",
    contraindications: [], // checklist
    treatment_goals: [], // multi-select
  });

  // Option lists
  const pastHistoryOptions = [
    "Diabetes",
    "Hypertension",
    "Heart disease",
    "Asthma",
    "Thyroid disorders",
    "Kidney disease",
    "Liver disease",
    "Skin disorders",
    "Arthritis",
    "Digestive problems",
    "Anxiety / Depression",
    "Recent surgery",
  ];

  const contraindicationOptions = [
    "Fever",
    "Severe weakness",
    "Pregnancy",
    "Active infection",
    "Recent surgery",
    "Severe heart disease",
    "Menstruation",
  ];

  const treatmentGoals = [
    "Detox",
    "Weight loss",
    "Stress relief",
    "Skin improvement",
    "Pain relief",
    "Chronic disease management",
    "General wellness",
  ];

  useEffect(() => {
    // If email was passed via state, set it
    if (initialEmail) {
      setForm((f) => ({ ...f, email: initialEmail }));
    }
  }, [initialEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const toggleMulti = (key, value) => {
    setForm((f) => {
      const cur = new Set(f[key] || []);
      if (cur.has(value)) cur.delete(value);
      else cur.add(value);
      return { ...f, [key]: Array.from(cur) };
    });
  };

  // Validation before moving next
  const validateStep1 = () => {
    const required = ["full_name", "gender", "dob", "phone", "email", "address"];
    for (const k of required) {
      if (!form[k] || String(form[k]).trim() === "") return false;
    }
    return true;
  };

  const validateStep2 = () => {
    // require blood group, height, weight at least
    if (!form.blood_group || !form.height || !form.weight) return false;
    return true;
  };

  const goNext = () => {
    if (!validateStep1()) {
      alert("Please fill all required personal information fields before proceeding.");
      return;
    }
    setStep(2);
  };

  const goPrev = () => setStep(1);

  const submitForm = async () => {
  const token = localStorage.getItem("token");

  // 1️⃣ Check if profile exists
  const check = await apiGet("/api/patient/profile/", token);

  let res;

  if (!check.success) {
    // 2️⃣ No profile → create profile
    res = await apiPost("/api/patient/profile/", form, token);
  } else {
    // 3️⃣ Profile exists → update profile
    res = await apiPut("/api/patient/profile/", form, token);
  }

  // 4️⃣ Redirect if API success
  if (res.success !== false) {
    alert("Profile Saved Successfully!");
    navigate("/home");
  } else {
    alert("Error saving profile: " + res.message);
  }
};


  return (
    <div className="cp-root">
      <div className="cp-card">
        <header className="cp-header">
          <h1>📝 Complete Your Profile</h1>
          <p className="muted">We need some information to personalize your Panchakarma plan.</p>
        </header>

        {step === 1 && (
          <section className="cp-section">
            <h2>Personal Information</h2>

            <div className="cp-grid">
              <div className="field">
                <label>Full name *</label>
                <input name="full_name" value={form.full_name} onChange={handleChange} />
              </div>

              <div className="field">
                <label>Gender *</label>
                <select name="gender" value={form.gender} onChange={handleChange}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="field">
                <label>Date of Birth *</label>
                <input type="date" name="dob" value={form.dob} onChange={handleChange} />
              </div>

              <div className="field">
                <label>Phone number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} />
              </div>

              <div className="field">
                <label>Email address *</label>
                <input name="email" value={form.email} onChange={handleChange} readOnly />
                <small className="hint">Email is prefilled and cannot be changed here.</small>
              </div>

              <div className="field full">
                <label>Address *</label>
                <textarea name="address" value={form.address} onChange={handleChange} />
              </div>

              <div className="field">
                <label>Marital status</label>
                <select name="marital_status" value={form.marital_status} onChange={handleChange}>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                </select>
              </div>

              <div className="field">
                <label>Occupation</label>
                <input name="occupation" value={form.occupation} onChange={handleChange} />
              </div>

              <div className="field">
                <label>Lifestyle</label>
                <select name="lifestyle" value={form.lifestyle} onChange={handleChange}>
                  <option value="Sedentary">Sedentary</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Highly active">Highly active</option>
                </select>
              </div>

              <div className="field">
                <label>Emergency contact name</label>
                <input name="emergency_contact_name" value={form.emergency_contact_name} onChange={handleChange} />
              </div>

              <div className="field">
                <label>Emergency contact relation</label>
                <input name="emergency_contact_relation" value={form.emergency_contact_relation} onChange={handleChange} />
              </div>

              <div className="field">
                <label>Emergency contact phone</label>
                <input name="emergency_contact_phone" value={form.emergency_contact_phone} onChange={handleChange} />
              </div>

              <div className="field">
                <label>Preferred communication</label>
                <select name="preferred_communication" value={form.preferred_communication} onChange={handleChange}>
                  <option>Email</option>
                  <option>SMS</option>
                  <option>WhatsApp</option>
                </select>
              </div>
            </div>

            <div className="cp-actions">
              <button className="btn primary" onClick={goNext}>Next</button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="cp-section">
            <h2>Medical Information</h2>

            <div className="cp-grid">
              <div className="field">
                <label>Blood group *</label>
                <select name="blood_group" value={form.blood_group} onChange={handleChange}>
                  <option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option>
                  <option>AB+</option><option>AB-</option>
                  <option>O+</option><option>O-</option>
                </select>
              </div>

              <div className="field">
                <label>Height (cm) *</label>
                <input name="height" value={form.height} onChange={handleChange} />
              </div>

              <div className="field">
                <label>Weight (kg) *</label>
                <input name="weight" value={form.weight} onChange={handleChange} />
              </div>

              <div className="field full">
                <label>Allergies</label>
                <input name="allergies" value={form.allergies} onChange={handleChange} placeholder="e.g. Penicillin, Dust" />
              </div>

              <div className="field">
                <label>Current medication</label>
                <input name="current_medication" value={form.current_medication} onChange={handleChange} />
              </div>

              <div className="field full">
                <label>Past medical history (select all that apply)</label>
                <div className="multi-grid">
                  {pastHistoryOptions.map((opt) => (
                    <label key={opt} className="chip">
                      <input type="checkbox" onChange={() => toggleMulti("past_medical_history", opt)} checked={form.past_medical_history.includes(opt)} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="field">
                <label>Appetite</label>
                <input name="appetite" value={form.appetite} onChange={handleChange} />
              </div>

              <div className="field">
                <label>Digestion</label>
                <input name="digestion" value={form.digestion} onChange={handleChange} />
              </div>

              <div className="field">
                <label>Bowel habits</label>
                <input name="bowel_habits" value={form.bowel_habits} onChange={handleChange} />
              </div>

              <div className="field">
                <label>Sleep quality</label>
                <input name="sleep_quality" value={form.sleep_quality} onChange={handleChange} />
              </div>

              <div className="field">
                <label>Stress level</label>
                <select name="stress_level" value={form.stress_level} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Low</option><option>Moderate</option><option>High</option>
                </select>
              </div>

              <div className="field">
                <label>Energy level</label>
                <select name="energy_level" value={form.energy_level} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Low</option><option>Moderate</option><option>High</option>
                </select>
              </div>

              <div className="field">
                <label>Blood pressure</label>
                <input name="blood_pressure" value={form.blood_pressure} onChange={handleChange} />
              </div>

              <div className="field">
                <label>Pulse rate</label>
                <input name="pulse_rate" value={form.pulse_rate} onChange={handleChange} />
              </div>

              <div className="field full">
                <label>Life style / Addictions</label>
                <input name="lifestyle_addictions" value={form.lifestyle_addictions} onChange={handleChange} placeholder="Smoking, Alcohol, Tobacco, Caffeine" />
              </div>

              <div className="field full">
                <label>Contraindications (check any)</label>
                <div className="multi-grid">
                  {contraindicationOptions.map((opt) => (
                    <label key={opt} className="chip">
                      <input type="checkbox" onChange={() => toggleMulti("contraindications", opt)} checked={form.contraindications.includes(opt)} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="field full">
                <label>Goals for Panchakarma (select all)</label>
                <div className="multi-grid">
                  {treatmentGoals.map((opt) => (
                    <label key={opt} className="chip">
                      <input type="checkbox" onChange={() => toggleMulti("treatment_goals", opt)} checked={form.treatment_goals.includes(opt)} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="cp-actions">
              <button className="btn" onClick={goPrev}>Back</button>
              <button className="btn primary" onClick={submitForm}>Finish</button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
