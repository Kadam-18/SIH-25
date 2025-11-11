import React, {useState} from "react";
import { useNavigate } from "react-router-dom"; // <-- import navigation hook :)
import "./Auth.css";
// import React from "react";

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = usestate("");
  const navigate = useNavigate(); // <-- initialize navigate function

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    // Later you can add actual login validation here
    navigate("/home"); // <-- redirect to Home page
  };
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <p>Login to continue your journey</p>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>

        <p style={{ marginTop: "20px" }}>
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}