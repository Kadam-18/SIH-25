import React, { useState, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from "chart.js";
import DarkModeToggle from "../components/DarkModeToggle";
import { apiGet } from "../api";
import "./ProgressTracking.css";

ChartJS.register(ArcElement, Tooltip, CategoryScale, LinearScale, BarElement, Title, Legend);

// 🎨 Color system
const COLORS = {
  Pain: "#ff6b6b",
  Sleep: "#6c8cff",
  Stress: "#f5a623",
  Energy: "#2ecc71",
  Digestion: "#9b59b6",
  Mood: "#feca57",

  Therapy: "#1dd1a1",
  Agni: "#ff793f",
  Vata: "#48dbfb",
  Pitta: "#ee5253",
  Kapha: "#10ac84",
};

const ActivityRing = ({ value, label, color, yesterday }) => {
  const improved = value > yesterday;

  const data = {
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: [color, "#2c2f3f"],
        borderWidth: 0,
        cutout: "72%",
      },
    ],
  };

  return (
    <div className={`ring-card ${improved ? "pulse" : ""}`}>
      <Doughnut data={data} />
      <div className="ring-center">
        <h3>{value}%</h3>
        <p>{label}</p>
        <span className={improved ? "up" : "down"}>
          {improved ? "▲ Improved" : "▼ No change"}
        </span>
      </div>
    </div>
  );
};

export default function ProgressTracking() {
  const [tab, setTab] = useState("self");
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Get progress summary
      const summaryRes = await apiGet("/api/progress/summary/", token);
      if (summaryRes && summaryRes.success) {
        setSummary(summaryRes.data);
        
        // Get latest entry for today's data
        const entries = summaryRes.data.entries || [];
        if (entries.length > 0) {
          const latest = entries[0];
          const previous = entries.length > 1 ? entries[1] : null;
          
          setProgressData({
            today: {
              Pain: latest.pain_level || 0,
              Sleep: latest.sleep_quality || 0,
              Stress: latest.stress_level || 0,
              Energy: latest.energy_level || 0,
              Digestion: latest.digestion_quality || 0,
              Mood: latest.mood_level || 0,
            },
            yesterday: previous ? {
              Pain: previous.pain_level || 0,
              Sleep: previous.sleep_quality || 0,
              Stress: previous.stress_level || 0,
              Energy: previous.energy_level || 0,
              Digestion: previous.digestion_quality || 0,
              Mood: previous.mood_level || 0,
            } : null
          });
        }
      }
    } catch (error) {
      console.error("Error fetching progress data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Default data if no progress entries
  const selfToday = progressData?.today || {
    Pain: 0,
    Sleep: 0,
    Stress: 0,
    Energy: 0,
    Digestion: 0,
    Mood: 0,
  };

  const selfYesterday = progressData?.yesterday || {
    Pain: 0,
    Sleep: 0,
    Stress: 0,
    Energy: 0,
    Digestion: 0,
    Mood: 0,
  };

  // Calculate KPI from summary
  const avgEnergy = summary?.average_metrics?.energy || 0;
  const energyTrend = summary?.improvement_trends?.energy || 0;
  const sleepTrend = summary?.improvement_trends?.sleep || 0;
  const stressTrend = summary?.improvement_trends?.stress || 0;
  const totalEntries = summary?.total_entries || 0;

  return (
    <div className={`progress-root ${dark ? "dark" : ""}`}>

      {/* HEADER */}
      <div className="progress-top">
        <div>
          <h2>Progress Dashboard</h2>
          <p>Your healing, visualized beautifully</p>
        </div>
        <DarkModeToggle dark={dark} setDark={setDark} />
      </div>

      {/* KPI SUMMARY */}
      <div className="kpi-grid">
        <div className="kpi">
          🔥 Avg Energy 
          <b>{energyTrend > 0 ? ` +${Math.round(energyTrend)}%` : energyTrend < 0 ? ` ${Math.round(energyTrend)}%` : " No change"}</b>
        </div>
        <div className="kpi">
          😴 Sleep Quality 
          <b>{sleepTrend > 0 ? ` +${Math.round(sleepTrend)}%` : " No change"}</b>
        </div>
        <div className="kpi">
          📊 Progress Entries 
          <b> {totalEntries} {totalEntries === 1 ? "entry" : "entries"}</b>
        </div>
        <div className="kpi">
          📉 Stress 
          <b>{stressTrend < 0 ? ` ${Math.round(stressTrend)}%` : stressTrend > 0 ? ` +${Math.round(stressTrend)}%` : " No change"}</b>
        </div>
      </div>

      {/* TABS */}
      <div className="progress-tabs">
        <button className={tab === "self" ? "active" : ""} onClick={() => setTab("self")}>
          Self Observation
        </button>
        <button className={tab === "therapist" ? "active" : ""} onClick={() => setTab("therapist")}>
          Therapist Observation
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>Loading progress data...</p>
        </div>
      ) : totalEntries === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>No progress entries yet. Fill out your first progress form after your therapy session!</p>
        </div>
      ) : (
        <>
          {/* RINGS */}
          <div className="rings-grid">
            {tab === "self" &&
              Object.keys(selfToday).map((k) => (
                <ActivityRing
                  key={k}
                  label={k}
                  value={Math.round(selfToday[k])}
                  yesterday={selfYesterday ? Math.round(selfYesterday[k]) : 0}
                  color={COLORS[k]}
                />
              ))}
          </div>

          {/* BAR CHART FOR TRENDS */}
          {summary && summary.entries && summary.entries.length > 1 && (
            <div style={{ marginTop: "40px", padding: "20px", background: dark ? "#1f2933" : "white", borderRadius: "16px" }}>
              <h3 style={{ marginBottom: "20px" }}>Progress Over Time</h3>
              <Bar
                data={{
                  labels: summary.entries.slice().reverse().map((e, i) => `Day ${e.day_number}`),
                  datasets: [
                    {
                      label: "Energy",
                      data: summary.entries.slice().reverse().map(e => e.energy_level),
                      backgroundColor: COLORS.Energy,
                    },
                    {
                      label: "Sleep",
                      data: summary.entries.slice().reverse().map(e => e.sleep_quality),
                      backgroundColor: COLORS.Sleep,
                    },
                    {
                      label: "Mood",
                      data: summary.entries.slice().reverse().map(e => e.mood_level),
                      backgroundColor: COLORS.Mood,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                    },
                  },
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
