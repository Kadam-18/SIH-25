import React, { useState } from "react";

/**
 * Centres carousel — horizontally scrollable section with arrows.
 * Accepts images prop as array of image URLs.
 */
export default function CentresCarousel({ images = [] }) {
  const [pos, setPos] = useState(0);

  const prev = () => setPos((p) => Math.max(0, p - 1));
  const next = () => setPos((p) => Math.min(images.length - 1, p + 1));

  return (
    <div className="centres-wrapper">
      <button className="carousel-arrow" onClick={prev} aria-label="Previous centre">‹</button>
      <div className="centres-track">
        {images.map((src, i) => (
          <div
            key={i}
            className="centre-card"
            style={{ 
              backgroundImage: `url(${src})`,
              transform: `translateX(-${pos * 100}%)` }}
          />
        ))}
      </div>
      <button className="carousel-arrow" onClick={next} aria-label="Next centre">›</button>
    </div>
  );
}