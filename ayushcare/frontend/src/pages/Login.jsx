import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { apiPost } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await apiPost("/api/auth/login/", {
      email,
      password,
    });

    if (res.access) {
      localStorage.setItem("token", res.access);
      alert("Login Successful!");
      navigate("/home");
    } else {
      alert("Invalid Login Details");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <p>Login to continue your journey</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p style={{ marginTop: "20px" }}>
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}
