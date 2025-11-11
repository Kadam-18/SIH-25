import React from "react";

/**
 * Displays 5 responsive cards. Each card has a simple hover animation.
 * Replace placeholders with real images, titles and descriptions later.
 */
export default function CardsSection() {
  const cards = [1, 2, 3, 4, 5];

  return (
    <div className="cards-grid">
      {cards.map((c) => (
        <article key={c} className="card">
          <div className="card-media">Card {c}</div>
          <h3 className="card-title">Card {c}</h3>
          <p className="card-desc muted">Short description about Card {c}. Replace later.</p>
          <button className="btn-small">Learn more</button>
        </article>
      ))}
    </div>
  );
}