import React, { useState, useEffect } from "react";
import "./Signup.css";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";

export default function Signup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [timer, setTimer] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  // Timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Trigger popup instead of sending OTP directly
  const handleSendOtpClick = () => {
    if (!email || !phone || !username || !password || !role) {
      return alert("Please fill all fields before sending OTP.");
    }
    setShowPopup(true);
  };

  // Send OTP API (email or phone)
  const sendOtp = async (method) => {
    setShowPopup(false);

    const res = await apiPost("/api/auth/signup/", {
      email,
      phone,
      username,
      password,
      role,
      send_to: method, // "email" or "phone"
    });

    if (res.success) {
      setTimer(60);
      alert(`OTP sent to your ${method}`);
      navigate("/verify-otp", { state: { email, phone } });
    } else {
      alert(res.message || "Error sending OTP");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert("OTP Verification is on next page.");
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
            type="text"
            placeholder="Enter Phone Number"
            required
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="password"
            placeholder="Create Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="otp-btn"
            onClick={handleSendOtpClick}
            disabled={timer > 0}
          >
            {timer > 0 ? `Resend in ${timer}s` : "Send OTP"}
          </button>

          <button type="submit" className="signup-submit">
            Create Account
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

      {/* -------- Popup -------- */}
      {showPopup && (
        <div className="otp-popup">
          <div className="popup-content">
            <p>Where do you want to receive OTP?</p>
            <button onClick={() => sendOtp("email")}>Email</button>
            <button onClick={() => sendOtp("phone")}>Phone Number</button>
            <button className="close-btn" onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
