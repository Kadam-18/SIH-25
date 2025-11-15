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

        {/* Contact */}
        <ContactSection />
      </main>
    </div>
  );
}