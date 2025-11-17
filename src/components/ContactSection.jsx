import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

/**
 * Contact section with placeholder info
 */
export default function ContactSection() {
  return (
    <section className="contact-section">
      <h2 className="section-title">Get in Touch With Us</h2>
      
      <div className="contact-wrapper"></div>

      <div className="contact-grid">
        <div className="contact-card">
          <FaMapMarkerAlt size={20} />
          <div>
            <h4>Address</h4>
            <p className="muted">123 Ayurveda Lane, Wellness City, India</p>
          </div>
        </div>

        <div className="contact-card">
          <FaPhone size={20} />
          <div>
            <h4>Phone</h4>
            <p className="muted">+91 98765 43210</p>
          </div>
        </div>

        <div className="contact-card">
          <FaEnvelope size={20} />
          <div>
            <h4>Email</h4>
            <p className="muted">contact@panchakarma.example</p>
          </div>
        </div>

        <div className="contact-card social">
          <div>
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}