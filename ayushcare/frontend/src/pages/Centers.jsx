// src/pages/Centers.jsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../api";
import CenterCard from "./CenterCard";
import { useNavigate } from "react-router-dom";

export default function Centers() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [centers, setCenters] = useState([]);
  const [userCity, setUserCity] = useState(null);

  useEffect(() => {
    loadCenters();
    loadUserProfile();
  }, []);

  async function loadCenters() {
    const res = await apiGet("/api/centers/", token);
    if (res && Array.isArray(res)) {
      setCenters(res);
    } else if (res && res.results) {
      setCenters(res.results);
    }
  }

  // try to fetch user profile & city (if logged in)
  async function loadUserProfile() {
    try {
      const profile = await apiGet("/api/patient/profile/", token);
      if (profile && profile.data && profile.data.city) {
        setUserCity(profile.data.city);
      } else if (profile && profile.city) {
        setUserCity(profile.city);
      }
    } catch {}
  }

  const onOpen = (centerId) => {
    navigate(`/centers/${centerId}`);
  };

  // Famous (first 6)
  const famous = centers.slice(0, 6);

  // closest by userCity
  const closest = userCity
    ? centers.filter(c => c.city && c.city.toLowerCase() === userCity.toLowerCase() && !famous.includes(c))
    : [];

  // Other centers (different state)
  const others = centers.filter(c => !closest.includes(c) && !famous.includes(c));

  return (
    <div className="page-centers" style={{padding:"28px"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h2>Panchakarma Centers</h2>
        <div>
          <input placeholder="Search centers..." />
          {/* location button — by default show user location if available */}
          <button style={{marginLeft:8}}>{userCity ? userCity : "Detect location"}</button>
        </div>
      </div>

      <section style={{marginTop:20}}>
        <h3>Famous Centers</h3>
        <div className="centers-grid">
          {famous.map(c => <CenterCard key={c.id} center={c} onOpen={onOpen} />)}
          {famous.length === 0 && <p>No famous centers yet.</p>}
        </div>
      </section>

      <section style={{marginTop:30}}>
        <h3>Closest Centers</h3>
        <div className="centers-grid">
          {closest.length ? closest.map(c => <CenterCard key={c.id} center={c} onOpen={onOpen} />)
            : <p>No centers found in your city.</p>}
        </div>
      </section>

      <section style={{marginTop:30}}>
        <h3>Other Centers</h3>
        <div className="centers-grid">
          {others.map(c => <CenterCard key={c.id} center={c} onOpen={onOpen} />)}
        </div>
      </section>
    </div>
  );
}
