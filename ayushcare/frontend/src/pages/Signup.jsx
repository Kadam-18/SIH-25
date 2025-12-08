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
    if (!email || !username || !password || !role)
      return alert("Fill all fields first");

    const res = await apiPost("/api/auth/signup/", {
      email,
      username,
      password,
      role,
    });

    if (res.success) {
      setTimer(60);
      alert("OTP sent to your email");
      navigate("/verify-otp", { state: { email } });
    } else {
      alert(res.message || "Error sending OTP");
    }
  };

  // Final Signup (Verify OTP)
  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await apiPost("/api/auth/verify-otp/", {
      email,
      otp,
    });

    if (res.success) {
      alert("Account Created!");
      navigate("/login");
    } else {
      alert(res.message || "Invalid OTP");
    }
  };

  return (
  <div className="auth-container">
    <div className="signup-box">
      <h2>Create Account</h2>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="otp-row">
          <input
            type="text"
            placeholder="Enter OTP"
            required
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            type="button"
            className="otp-btn"
            onClick={sendOtp}
            disabled={timer > 0}
          >
            {timer > 0 ? `Resend in ${timer}s` : "Send OTP"}
          </button>
        </div>

        <button type="submit" className="signup-submit">
          Create Account
        </button>
      </form>

      <p className="login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  </div>
);
} 