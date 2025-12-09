import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 🚨 Temporary test mode — No backend call
    setTimeout(() => {
      console.log("Skipping backend... Redirecting to dashboard.");

      // Fake credentials for UI testing
      localStorage.setItem("token", "test-token");
      localStorage.setItem("role", "doctor"); // Change to "therapist" to test therapist UI
      localStorage.setItem("name", "Test User");
      localStorage.setItem("user_id", "1");

      navigate("/doctor"); // Change to "/therapist" to test therapist dashboard

      setLoading(false);
    }, 800);

    /* 
    ---------------- ORIGINAL BACKEND LOGIN (COMMENTED OUT) ----------------

    try {
      const response = await fetch(`${API_URL}/api/auth/doctor-therapist-login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);
        localStorage.setItem("user_id", data.user_id);

        if (data.role === "doctor") {
          navigate("/doctor");
        } else if (data.role === "therapist") {
          navigate("/therapist");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
    -------------------------------------------------------------------------
    */
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>AyushCare</h1>
          <h2>Doctor & Therapist Login</h2>
          <p>Enter your credentials to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login-footer">
          <p>Credentials are provided by clinic admin</p>
        </div>
      </div>
    </div>
  );
}
