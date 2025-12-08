import React, { useState, useEffect } from "react";
import "./Signup.css";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";

export default function Signup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Send OTP API
  const sendOtp = async () => {
    if (!email || !username || !password) {
      return alert("Please fill all fields first");
    }

    const res = await apiPost("/api/auth/signup/", {
      email,
      username,
      password,
      role: "patient", // Default role
    });

    if (res.success) {
      setTimer(60);
      alert("OTP sent to your email");
      navigate("/verify-otp", { state: { email } });
    } else {
      alert(res.message || "Error sending OTP");
    }
  };

  return (
  <div className="auth-container">
    <div className="signup-box">
      <h2>Create Account</h2>

      <div>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className="otp-btn"
          onClick={sendOtp}
          disabled={timer > 0}
          style={{ width: "100%", marginTop: "14px" }}
        >
          {timer > 0 ? `Resend in ${timer}s` : "Send OTP"}
        </button>
      </div>

      <p className="login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  </div>
);
} 