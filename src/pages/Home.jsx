import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Carousel from "../components/Carousel";
import CardsSection from "../components/CardsSection";
import CentresCarousel from "../components/CentresCarousel";
import ContactSection from "../components/ContactSection";

/**
 * Home page: holds the state for sidebar open/close and passes props down
 */
export default function Home() {
  // sidebar visibility state (shared by Navbar & Sidebar)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // sample images (replace with real Panchakarma photos later)
  const heroImages = [
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=1b6338c5b9a0d8f6b9edc8c6d84b5b24",
    "https://images.unsplash.com/photo-1576765607923-7b9f8a928a06?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=5c6f6fba3fa4eef8a3c9f2c0a3c5d6b8",
    "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=2f3df4d0f8e2e0e1e3b9f6b1f6e4c8a9"
  ];

  const centresImages = [
    "https://images.unsplash.com/photo-1543352634-7f0e965e3a57?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4ad1932f9d6c93f7a3f3db7a2db7b4c3",
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=aaac4d6a3c1f9cdfb2a4fef2df7a8c4e",
    "https://images.unsplash.com/photo-1540199542-3a6a80450f70?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5d7626a9fef3bc8f6eaf72e7f6f7f5a1"
  ];

  return (
    <div className={`home-root ${sidebarOpen ? "no-scroll" : ""}`}>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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