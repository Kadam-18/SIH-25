import React, { useState, useEffect } from "react";
import "./Signup.css";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();// directed to home page 
  const [role, setRole] = useState(""); // patient or clinic
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // OTP Timer effect
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const sendOtp = () => {
    if (!email) {
      alert("Enter email first!");
      return;
    }
    setTimer(60);  // start timer
    alert(`OTP sent to ${email}`);  // later call backend API here
  };

 const handleSignup = (e) => {
  e.preventDefault();
  alert("Signup Complete!");
  navigate("/home");   // redirect to Home page
};


  return (
    <div className="auth-container">

      <div className="signup-box">
        <h2>Create Account</h2>

        {/* Role Selection */}
        <div className="role-select">
          <button
            className={role === "patient" ? "active" : ""}
            onClick={() => setRole("patient")}
          >
            As Patient
          </button>

          <button
            className={role === "clinic" ? "active" : ""}
            onClick={() => setRole("clinic")}
          >
            As Clinic
          </button>
        </div>

        {/* Show form only after role selection */}
        {role && (
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

            {/* OTP Field & Send OTP Button */}
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
        )}

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

    </div>
  );
}
