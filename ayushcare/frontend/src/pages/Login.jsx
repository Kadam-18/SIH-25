// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Auth.css";
import { apiPost, apiGet } from "../api";
import { auth } from "../components/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Prepare invisible reCAPTCHA once on mount
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }
  }, []);

  const verifyPhoneWithFirebase = async (phoneNumber) => {
    try {
      const formatted = phoneNumber.startsWith("+")
        ? phoneNumber
        : `+91${phoneNumber}`;
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formatted,
        appVerifier
      );
      const otp = window.prompt("Enter the OTP sent to your phone:");
      if (!otp) {
        throw new Error("OTP entry cancelled");
      }
      await confirmationResult.confirm(otp);
      return true;
    } catch (err) {
      console.error("Phone verification failed", err);
      toast.error("Phone verification failed. Please try again.");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const isPhoneLogin = email && !email.includes("@");

      // Optional phone verification (Firebase) when using phone number
      if (isPhoneLogin) {
        const verified = await verifyPhoneWithFirebase(email);
        if (!verified) {
          setLoading(false);
          return;
        }
      }

      // 1) LOGIN
      const res = await apiPost("/api/auth/login/", { email, password });

      if (!res || !res.access) {
        setError(res?.message || "Invalid Login Details");
        toast.error(res?.message || "Invalid Login Details");
        return;
      }

      // 2) SAVE TOKEN AND REFRESH TOKEN
      localStorage.setItem("token", res.access);
      if (res.refresh) {
        localStorage.setItem("refresh_token", res.refresh);
      }
      console.log("[Login] Saved token:", res.access.slice(0, 10));

      // 3) CHECK PROFILE
      console.log("[Login] Checking profile...");
      const profileCheck = await apiGet("/api/patient/profile/", res.access);
      console.log("[Login] Server profileCheck:", profileCheck);

      // 4) ROUTING LOGIC
      if (!profileCheck || !profileCheck.success || profileCheck.incomplete) {
        // profile missing or incomplete -> go to complete-profile with user data
        const userData = {
          email: res.user_email || email,
          username: res.user || email?.split('@')[0] || ''
        };
        navigate("/complete-profile", { state: userData });
      } else {
        // profile exists and complete -> home
        toast.success("Login successful!");
        navigate("/home");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please check your connection and try again.");
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <p>Login to continue your journey</p>

     <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email / Phone No."
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <p 
          className="forgot-text"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>
        
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <div style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
            {error}
          </div>
        )}
      </form>

        <p style={{ marginTop: "20px" }}>
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
      {/* Invisible recaptcha */}
      <div id="recaptcha-container" style={{ display: "none" }} />
    </div>
  );
}
