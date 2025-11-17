import React, { useRef } from "react";
import "./Landing.css";

export default function LandingPage() {
  const homeRef = useRef(null);
  const galleryRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing-root">

      {/* ---------------- NAVBAR ---------------- */}
      <nav className="landing-navbar">
        {/* Ayushcare Logo on Left */}
        <div className="nav-logo">
       <img src="/ayushcare-logo.png" alt="AyushCare Logo" className="logo-img" />
      </div>


        {/* Menu Buttons */}
        <div className="nav-links">
          <button onClick={() => scrollToSection(homeRef)}>Home</button>
          <button onClick={() => scrollToSection(galleryRef)}>Gallery</button>
          <button onClick={() => scrollToSection(aboutRef)}>About</button>
          <button onClick={() => scrollToSection(workRef)}>Work With Us</button>
        </div>

        {/* Login Button , Auth Buttons */}
      <div className="nav-auth">
        <button className="signup-btn" onClick={() => window.location.href="/signup"}>
          Sign Up
        </button>

        <button className="login-btn" onClick={() => window.location.href="/login"}>
          Login
        </button>
      </div>

      </nav>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="hero-section" ref={homeRef}>
        <h1>Experience the Ancient Healing of Panchakarma</h1>
        <p>Rebalance • Detoxify • Rejuvenate</p>
      </section>

     {/* ---------------- GALLERY SECTION ---------------- */}
    <section className="gallery-section" ref={galleryRef}>
      <h2 className="gallery-title">Gallery</h2>
       <div className="gallery-grid">
        
      <div className="gallery-card">
          <img src="/clinic1.jpg" alt="Panchakarma Clinic" />
          <p>Panchakarma Clinic</p>
      </div>

      <div className="gallery-card">
          <img src="/Equipment.jpg" alt="Panchakarma Equipments" />
          <p>Panchakarma Equipments</p>
      </div>

      <div className="gallery-card">
          <img src="/gallery3.avif" alt="Therapy Room" />
          <p>Panchakarma Therapy Room</p>
      </div>

      <div className="gallery-card">
          <img src="/gallery4.jpg" alt="Ayurvedic Treatment Setup" />
          <p>Ayurvedic Treatment Setup</p>
      </div>

      <div className="gallery-card">
          <img src="/gallery5.jpg" alt="Panchakarma Procedure" />
          <p>Panchakarma Procedure</p>
      </div>

      </div>
    </section>


      {/* ---------------- ABOUT SECTION ---------------- */}
      <section className="about-section" ref={aboutRef}>
        <h2>About Panchakarma</h2>
        <p>
          Panchakarma is a holistic Ayurvedic cleansing and healing process that rejuvenates
          the body and mind through detoxification therapies.
        </p>
      </section>

      {/* ---------------- WORK WITH US SECTION ---------------- */}
      <section className="work-section" ref={workRef}>
        <h2>Work With Us</h2>
        <p>Join us as a certified therapy center, therapist, or wellness partner.</p>
      </section>

    </div>
  );
}
