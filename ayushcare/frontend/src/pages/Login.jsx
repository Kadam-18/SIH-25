// // src/pages/Login.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Auth.css";
// import { apiPost, apiGet } from "../api";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // 1) LOGIN
//     const res = await apiPost("/api/auth/login/", { email, password });
//     if (!res || !res.access) {
//       alert("Invalid Login Details");
//       return;
//     }

//     // 2) SAVE TOKEN
//     localStorage.setItem("token", res.access);
//     console.log("[Login] Saved token:", res.access.slice(0, 10));

//     // 3) CHECK PROFILE
//     console.log("[Login] Checking profile...");
//     const profileCheck = await apiGet("/api/patient/profile/", res.access);
//     console.log("[Login] Server profileCheck:", profileCheck);

//     // 4) ROUTING LOGIC
//     if (!profileCheck || !profileCheck.success || profileCheck.incomplete) {
//       // profile missing or incomplete -> go to complete-profile
//       navigate("/complete-profile", { state: { email } });
//     } else {
//       // profile exists and complete -> home
//       navigate("/home");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Welcome Back</h2>
//         <p>Login to continue your journey</p>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button type="submit">Login</button>
//         </form>

//         <p style={{ marginTop: "20px" }}>
//           Don’t have an account? <a href="/signup">Sign up</a>
//         </p>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // simple redirect (no auth logic)
    navigate("/home");
    // window.location.replace("/home");
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>

        {/* <a href="Home.jsx">
          <button type="button" style={styles.button}>
            Login
          </button>
        </a> */}

      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5"
  },
  form: {
    padding: 20,
    background: "#fff",
    borderRadius: 5,
    width: 300,
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 10
  },
  button: {
    width: "100%",
    padding: 8,
    cursor: "pointer"
  }
};

export default Login;