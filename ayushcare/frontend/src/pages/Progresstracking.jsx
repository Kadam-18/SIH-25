// import React from "react";
// import {Chart as ChartJS} from "chart.js/auto"

import "./Progresstracking.css"

import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import "./ProgressTracking.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

export default function ProgressTracking() {
  const [activeTab, setActiveTab] = useState("self");

  // ✅ Dummy data – later comes from backend
  const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];

  // ---------------- PATIENT DATA ----------------
  const selfObservationData = {
    pain: [8, 7, 6, 5, 3],
    sleep: [4, 5, 6, 7, 8],
    energy: [3, 4, 5, 6, 7],
  };

  // ---------------- THERAPIST DATA ----------------
  const therapistData = {
    therapySessions: [1, 2, 3, 4, 5],
    weight: [72, 71.5, 71, 70.8, 70.5],
  };

  return (
    <div className="progress-container">
      <h2>Progress Tracking</h2>
      <p className="subtitle">
        Track your healing journey with daily observations and clinical updates
      </p>

      {/* Tabs */}
      <div className="tab-buttons">
        <button
          className={activeTab === "self" ? "active" : ""}
          onClick={() => setActiveTab("self")}
        >
          Self Observation
        </button>

        <button
          className={activeTab === "therapist" ? "active" : ""}
          onClick={() => setActiveTab("therapist")}
        >
          Therapist Observation
        </button>
      </div>

      {/* ---------------- SELF OBSERVATION TAB ---------------- */}
      {activeTab === "self" && (
        <div className="tab-content">
          <h3>Patient Self Observation</h3>
          <p className="tag patient-tag">Data entered by patient</p>

          {/* Pain Chart */}
          <div className="chart-card">
            <h4>Pain Level Progress</h4>
            <Line
              data={{
                labels: days,
                datasets: [
                  {
                    label: "Pain Level",
                    data: selfObservationData.pain,
                    borderColor: "#e63946",
                    backgroundColor: "rgba(230,57,70,0.2)",
                  },
                ],
              }}
            />
          </div>

          {/* Sleep Chart */}
          <div className="chart-card">
            <h4>Sleep Quality</h4>
            <Line
              data={{
                labels: days,
                datasets: [
                  {
                    label: "Sleep Quality",
                    data: selfObservationData.sleep,
                    borderColor: "#1d3557",
                    backgroundColor: "rgba(29,53,87,0.2)",
                  },
                ],
              }}
            />
          </div>

          {/* Energy Chart */}
          <div className="chart-card">
            <h4>Energy Levels</h4>
            <Bar
              data={{
                labels: days,
                datasets: [
                  {
                    label: "Energy",
                    data: selfObservationData.energy,
                    backgroundColor: "#457b9d",
                  },
                ],
              }}
            />
          </div>
        </div>
      )}

      {/* ---------------- THERAPIST OBSERVATION TAB ---------------- */}
      {activeTab === "therapist" && (
        <div className="tab-content">
          <h3>Therapist Observation</h3>
          <p className="tag therapist-tag">Data entered by clinic</p>

          {/* Therapy Completion */}
          <div className="chart-card">
            <h4>Therapy Sessions Completed</h4>
            <Bar
              data={{
                labels: days,
                datasets: [
                  {
                    label: "Sessions",
                    data: therapistData.therapySessions,
                    backgroundColor: "#2a9d8f",
                  },
                ],
              }}
            />
          </div>

          {/* Weight Trend */}
          <div className="chart-card">
            <h4>Weight Trend</h4>
            <Line
              data={{
                labels: days,
                datasets: [
                  {
                    label: "Weight (kg)",
                    data: therapistData.weight,
                    borderColor: "#264653",
                    backgroundColor: "rgba(38,70,83,0.2)",
                  },
                ],
              }}
            />
          </div>

          {/* Notes */}
          <div className="notes-card">
            <h4>Therapist Notes</h4>
            <p>
              Patient is responding well to Panchakarma therapy. Agni improving
              steadily. Continue Abhyanga + Swedana for next 3 sessions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
