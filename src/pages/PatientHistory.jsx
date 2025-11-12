import React, { useState, useMemo } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaDownload,
} from "react-icons/fa";
import "./PatientHistory.css";

export default function PatientHistory() {
  const [search, setSearch] = useState("");

  // 🔹 Dummy patient info
  const patientInfo = {
    name: "Anirudh Yadav",
    age: 29,
    gender: "Male",
    contact: "+91 98765 43210",
    lastVisit: "2025-02-18",
    doctor: "Dr. Meera Shankar",
  };

  // 🔹 Dummy medical history
  const medicalHistory = [
    {
      date: "2025-01-10",
      diagnosis: "Digestive Imbalance",
      treatment: "Virechana Therapy",
      duration: "7 Days",
      doctor: "Dr. Meera Shankar",
      status: "Completed",
    },
    {
      date: "2025-02-02",
      diagnosis: "Stress & Anxiety",
      treatment: "Shirodhara",
      duration: "5 Sessions",
      doctor: "Dr. Rajesh Nair",
      status: "Completed",
    },
    {
      date: "2025-03-12",
      diagnosis: "Joint Pain",
      treatment: "Abhyanga Massage",
      duration: "10 Days",
      doctor: "Dr. Sneha Patel",
      status: "Ongoing",
    },
    {
      date: "2025-04-18",
      diagnosis: "Insomnia",
      treatment: "Nasya Therapy",
      duration: "1 Week",
      doctor: "Dr. Meera Shankar",
      status: "Follow-up Needed",
    },
    {
      date: "2025-05-08",
      diagnosis: "Detox & Rejuvenation",
      treatment: "Panchakarma Cleanse",
      duration: "14 Days",
      doctor: "Dr. Rajesh Nair",
      status: "Completed",
    },
  ];

  // 🔹 Dummy prescriptions / recommendations
  const prescriptions = [
    {
      name: "Triphala Churna",
      desc: "Digestive cleanser & detoxifier",
      duration: "2 Weeks",
    },
    {
      name: "Shirodhara Therapy",
      desc: "Stress & mental relaxation",
      duration: "5 Sessions",
    },
    {
      name: "Ashwagandha Capsules",
      desc: "Energy booster & improves immunity",
      duration: "1 Month",
    },
  ];

  // 🔹 Search filter (by date or diagnosis)
  const filteredHistory = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return medicalHistory;
    return medicalHistory.filter(
      (r) =>
        r.date.includes(q) ||
        r.diagnosis.toLowerCase().includes(q)
    );
  }, [search, medicalHistory]);

  return (
    <div className="patient-history-root">
      {/* Page Header */}
      <div className="history-header">
        <div>
          <h1>Patient History</h1>
          <p className="muted">
            View your past treatments, diagnoses, and wellness reports.
          </p>
        </div>

        <div className="header-actions">
          <div className="search-box">
            <FaCalendarAlt className="search-icon" />
            <input
              type="text"
              placeholder="Search by Date or Diagnosis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="btn-export">
            <FaDownload />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Personal Details */}
      <section className="personal-card">
        <h2><FaUser /> Personal Details</h2>
        <div className="personal-grid">
          <div><strong>Name:</strong> {patientInfo.name}</div>
          <div><strong>Age:</strong> {patientInfo.age}</div>
          <div><strong>Gender:</strong> {patientInfo.gender}</div>
          <div><strong>Contact:</strong> {patientInfo.contact}</div>
          <div><strong>Last Visit:</strong> {patientInfo.lastVisit}</div>
          <div><strong>Doctor:</strong> {patientInfo.doctor}</div>
        </div>
      </section>

      {/* Medical History Table */}
      <section className="table-card">
        <h2>Medical History</h2>
        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Diagnosis</th>
              <th>Treatment / Therapy</th>
              <th>Duration</th>
              <th>Doctor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length === 0 ? (
              <tr className="empty-row">
                <td colSpan="6">No records found.</td>
              </tr>
            ) : (
              filteredHistory.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "alt" : ""}>
                  <td>{row.date}</td>
                  <td>{row.diagnosis}</td>
                  <td>{row.treatment}</td>
                  <td>{row.duration}</td>
                  <td>{row.doctor}</td>
                  <td>
                    <span
                      className={`status ${
                        row.status === "Completed"
                          ? "completed"
                          : row.status === "Ongoing"
                          ? "ongoing"
                          : "follow"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination (UI only) */}
        <div className="pagination">
          <button className="page-btn">Previous</button>
          <div className="page-info">Page 1 of 1</div>
          <button className="page-btn">Next</button>
        </div>
      </section>

      {/* Prescriptions / Recommendations */}
      <section className="prescriptions-section">
        <h2>Prescriptions & Recommendations</h2>
        <div className="prescription-cards">
          {prescriptions.map((item, i) => (
            <div key={i} className="prescription-card">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <span className="duration">⏳ {item.duration}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}