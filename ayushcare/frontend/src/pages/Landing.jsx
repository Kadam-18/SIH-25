import React, { useRef } from "react";
import "./Landing.css";

export default function LandingPage() {
  const homeRef = useRef(null);
  const galleryRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);

  const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="landing-root">
      <nav className="landing-navbar">
        <div className="nav-logo">
          <img src="/ayushcare-logo.png" alt="AyushCare Logo" />
        </div>

        <div className="nav-links">
          <button onClick={() => scrollToSection(homeRef)}>Home</button>
          <button onClick={() => scrollToSection(galleryRef)}>Gallery</button>
          <button onClick={() => scrollToSection(aboutRef)}>About</button>
          <button onClick={() => scrollToSection(workRef)}>Work With Us</button>
        </div>

        <div className="nav-auth">
          <button className="signup-btn">Sign Up</button>
          <button className="login-btn">Login</button>
        </div>
      </nav>

      <section className="hero-section" ref={homeRef}>
        <h1 className="landing-welcome">Welcome to AyushCare</h1>
        <h2 className="landing-title">Experience the Ancient Healing of Panchakarma</h2>
        <p className="landing-sub">
          A holistic journey towards balance, detoxification, and natural rejuvenation.
          Embrace the ancient wisdom of Panchakarma — where healing begins from within.
        </p>
      </section>

      <section className="gallery-section" ref={galleryRef}>
        <h2 className="gallery-title">Gallery</h2>
        <div className="gallery-grid">

          <div className="gallery-card">
            <img src="/Equipment.jpg" alt="Equipments" />
            <p>Panchakarma Equipments</p>
          </div>

          <div className="gallery-card">
            <img src="/gallery3.avif" alt="Therapy Room" />
            <p>Panchakarma Therapy Room</p>
          </div>

          <div className="gallery-card">
            <img src="/treatment 1.jpeg" alt="Setup" />
            <p>Ayurvedic Treatment Setup</p>
          </div>

          <div className="gallery-card">
            <img src="/treatment 2.jpg" alt="Procedure" />
            <p>Panchakarma Procedure</p>
          </div>

        </div>
      </section>

      <section className="about-section" ref={aboutRef}>
        <h2>About Panchakarma</h2>
        <p>
          Panchakarma is the essence of Ayurvedic healing — a therapeutic detoxification system
          designed to cleanse the body, balance the doshas, and restore natural immunity.
          A combination of herbal therapies, medicated oils, steam, and rejuvenation techniques
          helps eliminate toxins and rejuvenates both mind and body.
        </p>
      </section>

      <section className="work-section" ref={workRef}>
        <h2>Work With Us</h2>
        <p>
          Join AyushCare as a wellness partner, clinic, therapist, or Ayurvedic centre.
          Grow with digital tools for patient engagement, therapy scheduling,
          service promotion and nationwide exposure.
        </p>
        <button className="join-btn">Become a Partner</button>
      </section>

    </div>
  );
}
