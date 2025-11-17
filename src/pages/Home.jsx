import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
import Carousel from "../components/Carousel";
import CardsSection from "../components/CardsSection";
import CentresCarousel from "../components/CentresCarousel";
import ContactSection from "../components/ContactSection";

import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";

import "./Home.css";


/**
 * Home page: holds the state for sidebar open/close and passes props down
 */
export default function Home() {
  // sidebar visibility state (shared by Navbar & Sidebar)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // sample images (replace with real Panchakarma photos later)
  const heroImages = [ hero1, hero2, hero3, hero4];

  const centresImages = [
    "https://images.unsplash.com/photo-1543352634-7f0e965e3a57?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4ad1932f9d6c93f7a3f3db7a2db7b4c3",
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=aaac4d6a3c1f9cdfb2a4fef2df7a8c4e",
    "https://images.unsplash.com/photo-1540199542-3a6a80450f70?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5d7626a9fef3bc8f6eaf72e7f6f7f5a1"
  ];

  return (
    <div className="home-root" style={{ position: "relative" }}>
    {/* <div className={`home-root ${sidebarOpen ? "no-scroll" : ""}`}>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

      <main className="container">
        {/* Hero carousel */}
        <Carousel images={heroImages} />

        {/* Description */}
        <section className="description-section">
          <h2>Discover the Healing Power of Panchakarma</h2>
          <p className="muted">
            Panchakarma is an ancient Ayurvedic detoxification therapy designed to remove toxins, balance
            the doshas, and restore wellbeing. (Edit this paragraph later with your own content.)
          </p>
        </section>

        {/* Cards */}
        <section>
          <h2 className="section-title">Our Wellness Offerings</h2>
          <CardsSection />
        </section>

        {/* Centres carousel */}
        <section>
          <h2 className="section-title">Our Centres Across India</h2>
          <CentresCarousel images={centresImages} />
        </section>

   
        
         {/*new section (edited on :-14th nov midnight 1:08) */}
        
        {/* Why Panchakarma Section */}
        <div className="whybox">
    <section className="why-section">
      <h2>Why Choose Panchakarma?</h2>
      <p>Rooted in ancient Ayurvedic wisdom, Panchakarma restores balance, detoxifies the body, 
        and enhances emotional & physical wellbeing.</p>

      <div className="why-grid">
        <div className="why-card">
          <h3>🌿 Natural Detox</h3>
          <p>Flushes deep-rooted toxins and rejuvenates your body.</p>
        </div>
        <div className="why-card">
          <h3>🧘 Mind-Body Balance</h3>
          <p>Helps stabilize doshas for emotional clarity and peace.</p>
        </div>
        <div className="why-card">
          <h3>💆 Holistic Healing</h3>
          <p>Combines therapies, diet, yoga, and lifestyle treatments.</p>
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="stats-section">
      <div className="stats-box">
        <h3>5000+</h3>
        <p>Successful Therapies</p>
      </div>
      <div className="stats-box">
        <h3>50+</h3>
        <p>Panchakarma Centres</p>
      </div>
      <div className="stats-box">
        <h3>20 Years</h3>
        <p>Ayurveda Experience</p>
      </div>
    </section>
    </div>

   {/* Contact */}
      <section className="contact-wrapper">
        <ContactSection />
      </section>

      </main>
    </div>
  );
}