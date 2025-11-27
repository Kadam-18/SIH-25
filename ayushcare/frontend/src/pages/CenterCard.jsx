// src/pages/CenterCard.jsx
import React from "react";
import "./CenterCard.css"; // create styles as you like

export default function CenterCard({ center, onOpen }) {
  // center.image1/2 may be full URLs served by Django. map_image_url too.
  return (
    <div className="center-card">
      <div className="center-card-left">
        <div className="images-grid">
          <img src={center.image1 || "/placeholder1.jpg"} alt={center.name} />
          <img src={center.image2 || "/placeholder2.jpg"} alt={center.name} />
        </div>
        <div className="map-preview">
          <img src={center.map_image_url || "/map-placeholder.jpg"} alt="map" />
        </div>
      </div>

      <div className="center-card-right">
        <h3>{center.name}</h3>
        <p className="muted">{center.city}, {center.state}</p>
        <p>{center.address}</p>
        <p><strong>Phone:</strong> {center.contact_number}</p>
        <p>{center.description}</p>

        <div className="center-actions">
          <button onClick={() => onOpen(center.id)}>View Details & Book</button>
        </div>
      </div>
    </div>
  );
}
