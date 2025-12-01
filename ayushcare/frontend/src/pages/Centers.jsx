// src/pages/Centers.jsx
import React, { useEffect, useState } from "react";
// import { apiGet } from "../api"; // ❌ backend disabled
import CenterCard from "./CenterCard.jsx";
import { useNavigate } from "react-router-dom";

export default function Centers() {
  const navigate = useNavigate();

  // const token = localStorage.getItem("token"); // ❌ backend token disabled

  const [centers, setCenters] = useState([]);
  const [userCity, setUserCity] = useState(null);

  useEffect(() => {
    loadCenters();
    loadUserProfile();
  }, []);

  async function loadCenters() {
    // ❌ BACKEND CALL DISABLED
    /*
    const res = await apiGet("/api/centers/", token);
    if (res && Array.isArray(res)) {
      setCenters(res);
    } else if (res && res.results) {
      setCenters(res.results);
    }
    */

    // ✅ FRONTEND MOCK DATA (temporary)
    setCenters([
      { id: 1, name: "Mock Center 1", city: "Mumbai" },
      { id: 2, name: "Mock Center 2", city: "Delhi" },
      { id: 3, name: "Mock Center 3", city: "Pune" },
      { id: 4, name: "Mock Center 4", city: "Mumbai" },
      { id: 5, name: "Mock Center 5", city: "Goa" },
      { id: 6, name: "Mock Center 6", city: "Mumbai" },
    ]);

    // TODO: Re-enable API once backend is ready
  }

  async function loadUserProfile() {
    // ❌ BACKEND CALL DISABLED
    /*
    try {
      const profile = await apiGet("/api/patient/profile/", token);
      if (profile && profile.data && profile.data.city) {
        setUserCity(profile.data.city);
      } else if (profile && profile.city) {
        setUserCity(profile.city);
      }
    } catch {}
    */

    // ✅ FRONTEND MOCK USER CITY
    setUserCity("Mumbai");

    // TODO: Replace with actual profile API once backend is available
  }

  const onOpen = (centerId) => {
    navigate(`/centers/${centerId}`);
  };

  const famous = centers.slice(0, 6);

  const closest = userCity
    ? centers.filter(
        (c) =>
          c.city &&
          c.city.toLowerCase() === userCity.toLowerCase() &&
          !famous.includes(c)
      )
    : [];

  const others = centers.filter(
    (c) => !closest.includes(c) && !famous.includes(c)
  );

  return (
    <div className="page-centers" style={{ padding: "28px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Panchakarma Centers</h2>
        <div>
          <input placeholder="Search centers..." />
          <button style={{ marginLeft: 8 }}>
            {userCity ? userCity : "Detect location"}
          </button>
        </div>
      </div>

      <section style={{ marginTop: 20 }}>
        <h3>Famous Centers</h3>
        <div className="centers-grid">
          {famous.map((c) => (
            <CenterCard key={c.id} center={c} onOpen={onOpen} />
          ))}
          {famous.length === 0 && <p>No famous centers yet.</p>}
        </div>
      </section>

      <section style={{ marginTop: 30 }}>
        <h3>Closest Centers</h3>
        <div className="centers-grid">
          {closest.length ? (
            closest.map((c) => (
              <CenterCard key={c.id} center={c} onOpen={onOpen} />
            ))
          ) : (
            <p>No centers found in your city.</p>
          )}
        </div>
      </section>

      <section style={{ marginTop: 30 }}>
        <h3>Other Centers</h3>
        <div className="centers-grid">
          {others.map((c) => (
            <CenterCard key={c.id} center={c} onOpen={onOpen} />
          ))}
        </div>
      </section>
    </div>
  );
}