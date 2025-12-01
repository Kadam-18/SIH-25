// src/pages/CenterDetail.jsx
import React, { useEffect, useState } from "react";
// import { apiGet, apiPost } from "../api"; // ❌ backend disabled
import { useParams, useNavigate } from "react-router-dom";

export default function CenterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // const token = localStorage.getItem("token"); // ❌ token disabled

  const [center, setCenter] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    loadCenter();
    loadDoctors();
  }, [id]);

  async function loadCenter() {
    // ❌ BACKEND CALL DISABLED
    /*
    const res = await apiGet(/api/centers/${id}/, token);
    setCenter(res);
    */

    // ✅ FRONTEND MOCK CENTER
    setCenter({
      id: id,
      name: "Mock Center " + id,
      address: "123 Mock Street, Mumbai",
      contact_number: "+91 9000000000",
      description: "This is a mock center for frontend testing.",
      image1: "/placeholder1.jpg",
      image2: "/placeholder2.jpg",
      map_image_url: "/mock-map.jpg"
    });

    // TODO: Restore backend fetch when ready
  }

  async function loadDoctors() {
    // ❌ BACKEND CALL DISABLED
    /*
    const res = await apiGet(/api/appointments/doctors/by-center/${id}/, token);
    if (Array.isArray(res)) setDoctors(res);
    else if (res.data) setDoctors(res.data);
    */

    // ✅ FRONTEND MOCK DOCTORS
    setDoctors([
      { id: 1, name: "Dr. Mock A", specialty: "Ayurveda", timing: "10am - 2pm" },
      { id: 2, name: "Dr. Mock B", specialty: "Panchakarma", timing: "2pm - 6pm" },
    ]);

    // TODO: Replace with backend response later
  }

  const slotToTime = (slot) => {
    if (slot === "10am-2pm") return "10:00:00";
    if (slot === "2pm-6pm") return "14:00:00";
    if (slot === "6pm-10pm") return "18:00:00";
    return "10:00:00";
  };

  const bookAppointment = async () => {
    if (!selectedDoctorId || !selectedDate || !selectedSlot) {
      alert("Select doctor, date and a time slot.");
      return;
    }

    const payload = {
      doctor: selectedDoctorId,
      date: selectedDate,
      time: slotToTime(selectedSlot),
      appointment_type: "consultation",
      notes: `Booked via center ${center?.name}`,
      location_name: center?.name
    };

    // ❌ BACKEND DISABLED — COMMENTED OUT
    /*
    const res = await apiPost("/api/appointments/create/", payload, token);
    if (res && res.id) {
      alert("Appointment booked!");
      navigate("/schedule");
    } else {
      alert(res.message || "Failed to book — check console.");
      console.log("book result", res);
    }
    */

    // ✅ MOCK SUCCESS FOR FRONTEND
    alert("✔ Appointment booked (frontend mock)");
    navigate("/schedule");

    // TODO: Re-enable API when backend is available
  };

  if (!center) return <div>Loading...</div>;

  return (
    <div style={{padding:24}}>
      <div style={{display:"flex", gap:20}}>
        <div style={{width:"50%"}}>
          <div style={{display:"flex", gap:8}}>
            <img src={center.image1 || "/placeholder1.jpg"} alt="" style={{width:"50%", height:220, objectFit:"cover", borderRadius:8}} />
            <img src={center.image2 || "/placeholder2.jpg"} alt="" style={{width:"50%", height:220, objectFit:"cover", borderRadius:8}} />
          </div>
          <div style={{marginTop:8}}>
            <img src={center.map_image_url} alt="map" style={{width:"100%", height:260, objectFit:"cover", borderRadius:8}}/>
          </div>
        </div>

        <div style={{width:"50%"}}>
          <h2>{center.name}</h2>
          <p>{center.address}</p>
          <p><strong>Phone:</strong> {center.contact_number}</p>
          <p>{center.description}</p>

          <hr />

          <h3>Doctors</h3>
          <table style={{width:"100%", borderCollapse:"collapse"}}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialty</th>
                <th>Timing</th>
                <th>Book</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map(d => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{d.specialty}</td>
                  <td>{d.timing}</td>
                  <td>
                    <button onClick={() => setSelectedDoctorId(d.id)}>Select</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{marginTop:16}}>
            <h4>Book appointment</h4>
            <p><strong>Selected doctor id:</strong> {selectedDoctorId || "none"}</p>
            <label>Date: </label>
            <input type="date" value={selectedDate} onChange={e=>setSelectedDate(e.target.value)} />
            <div style={{marginTop:8}}>
              <label>Time slot:</label>
              <select value={selectedSlot} onChange={e=>setSelectedSlot(e.target.value)}>
                <option value="">Choose slot</option>
                <option value="10am-2pm">10:00 AM - 02:00 PM</option>
                <option value="2pm-6pm">02:00 PM - 06:00 PM</option>
                <option value="6pm-10pm">06:00 PM - 10:00 PM</option>
              </select>
            </div>

            <div style={{marginTop:12}}>
              <button onClick={bookAppointment} style={{padding:"8px 12px"}}>
                Book Appointment & Pay
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}