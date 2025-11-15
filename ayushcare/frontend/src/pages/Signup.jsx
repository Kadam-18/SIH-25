import React, {useState} from "react";
import { useNavigate } from "react-router-dom"; // <-- import navigation hook
import "./Auth.css";

// import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../components/firebase"

export default function Signup() {
  const [email,setEmail]=useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname]=useState("");
  const navigate = useNavigate(); // <-- initialize navigate function

  // const handleRegister=(e)=>{
  //   e.preventDefault();
  // }

  // Handle form submission
  const handleSubmit =async (e) => {
    e.preventDefault();
    // Later you can add backend signup logic here
    navigate("/home"); // <-- redirect to Home page

    try{
     await createUserWithEmailAndPassword(auth,email,password);
     const user=auth.currentUser;
     console.log(user);
     console.log("user Registered Succesfully!");
     
    }catch(error){
      console.log(error.message);
      
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        <p>Join us and get started today!</p>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" onChange={(e) =>setFullname(e.target.value)} required />
          <input type="email" placeholder="Email" onChange={(e) =>setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) =>setPassword(e.target.value)}required />
          <button type="submit">Sign Up</button>
        </form>

        <p style={{ marginTop: "20px" }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
    );
}