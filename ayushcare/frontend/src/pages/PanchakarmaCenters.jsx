import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaStar,
  FaPhone,
  FaGlobe,
  FaClock,
  FaUserMd,
  FaFilter,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./PanchakarmaCenters.css";
import { getCenters } from "../api";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Sample data for panchakarma centers across India
// const centers = [
//   {
//     id: 1,
//     name: "Ayurveda Yoga Villa",
//     city: "Rishikesh",
//     state: "Uttarakhand",
//     pincode: "249201",
//     address: "Laxman Jhula Road, Tapovan, Rishikesh",
//     specialties: ["Panchakarma", "Yoga Therapy", "Detox"],
//     rating: 4.8,
//     phone: "+91-135-2445678",
//     website: "www.ayurvedayogavilla.com",
//     timing: "7:00 AM - 8:00 PM",
//     doctors: 8,
//     coordinates: { lat: 30.1339, lng: 78.3361 },
//     popular: true
//   },
//   {
//     id: 2,
//     name: "Sanjeevani Ayurvedic Center",
//     city: "Kerala",
//     state: "Kerala",
//     pincode: "682301",
//     address: "MG Road, Ernakulam, Kochi",
//     specialties: ["Kerala Panchakarma", "Abhyangam", "Shirodhara"],
//     rating: 4.9,
//     phone: "+91-484-2456789",
//     website: "www.sanjeevaniayurveda.com",
//     timing: "6:00 AM - 9:00 PM",
//     doctors: 12,
//     coordinates: { lat: 9.9312, lng: 76.2673 },
//     popular: true
//   },
//   {
//     id: 3,
//     name: "Prakriti Wellness Center",
//     city: "Delhi",
//     state: "Delhi",
//     pincode: "110001",
//     address: "Connaught Place, New Delhi",
//     specialties: ["Therapeutic Massage", "Nasya", "Basti"],
//     rating: 4.7,
//     phone: "+91-11-23456789",
//     website: "www.prakritiwellness.com",
//     timing: "8:00 AM - 8:00 PM",
//     doctors: 6,
//     coordinates: { lat: 28.6139, lng: 77.2090 },
//     popular: true
//   },
//   {
//     id: 4,
//     name: "Swasthya Panchakarma Clinic",
//     city: "Mumbai",
//     state: "Maharashtra",
//     pincode: "400001",
//     address: "Marine Drive, Mumbai",
//     specialties: ["Full Panchakarma", "Rejuvenation", "Stress Relief"],
//     rating: 4.6,
//     phone: "+91-22-26789012",
//     website: "www.swasthyapanchakarma.com",
//     timing: "7:30 AM - 8:30 PM",
//     doctors: 10,
//     coordinates: { lat: 18.9750, lng: 72.8258 },
//     popular: true
//   },
//   {
//     id: 5,
//     name: "Vedasara Ayurvedic Hospital",
//     city: "Bangalore",
//     state: "Karnataka",
//     pincode: "560001",
//     address: "MG Road, Bangalore",
//     specialties: ["Traditional Panchakarma", "Kayakalpa", "Rasayana"],
//     rating: 4.8,
//     phone: "+91-80-23456789",
//     website: "www.vedasara.com",
//     timing: "6:30 AM - 9:00 PM",
//     doctors: 15,
//     coordinates: { lat: 12.9716, lng: 77.5946 },
//     popular: true
//   },
//   {
//     id: 6,
//     name: "Shree Ayurveda Center",
//     city: "Pune",
//     state: "Maharashtra",
//     pincode: "411001",
//     address: "FC Road, Pune",
//     specialties: ["Detox Programs", "Weight Management", "Skin Care"],
//     rating: 4.5,
//     phone: "+91-20-25678901",
//     website: "www.shreeayurveda.com",
//     timing: "8:00 AM - 8:00 PM",
//     doctors: 7,
//     coordinates: { lat: 18.5204, lng: 73.8567 },
//     popular: false
//   },
//   {
//     id: 7,
//     name: "Ayurgram Wellness Resort",
//     city: "Goa",
//     state: "Goa",
//     pincode: "403001",
//     address: "Calangute Beach, Goa",
//     specialties: ["Beachside Therapy", "Meditation", "Ayurvedic Diet"],
//     rating: 4.7,
//     phone: "+91-832-2456789",
//     website: "www.ayurgram.com",
//     timing: "6:00 AM - 10:00 PM",
//     doctors: 9,
//     coordinates: { lat: 15.2993, lng: 74.1240 },
//     popular: false
//   },
//   {
//     id: 8,
//     name: "Dhanwantari Ayurveda",
//     city: "Chennai",
//     state: "Tamil Nadu",
//     pincode: "600001",
//     address: "Anna Salai, Chennai",
//     specialties: ["Siddha Panchakarma", "Herbal Treatment", "Oil Therapy"],
//     rating: 4.6,
//     phone: "+91-44-23456789",
//     website: "www.dhanwantari.com",
//     timing: "7:00 AM - 8:00 PM",
//     doctors: 11,
//     coordinates: { lat: 13.0827, lng: 80.2707 },
//     popular: false
//   },
//   {
//     id: 9,
//     name: "Rishi Ayurveda Center",
//     city: "Haridwar",
//     state: "Uttarakhand",
//     pincode: "249401",
//     address: "Har Ki Pauri, Haridwar",
//     specialties: ["Spiritual Healing", "Ganga Therapy", "Pranayama"],
//     rating: 4.8,
//     phone: "+91-133-4567890",
//     website: "www.rishiayurveda.com",
//     timing: "5:00 AM - 9:00 PM",
//     doctors: 8,
//     coordinates: { lat: 29.9457, lng: 78.1642 },
//     popular: false
//   },
//   {
//     id: 10,
//     name: "Nadi Pariksha Center",
//     city: "Hyderabad",
//     state: "Telangana",
//     pincode: "500001",
//     address: "HITEC City, Hyderabad",
//     specialties: ["Nadi Diagnosis", "Pulse Reading", "Personalized Therapy"],
//     rating: 4.7,
//     phone: "+91-40-23456789",
//     website: "www.nadipariksha.com",
//     timing: "8:00 AM - 8:00 PM",
//     doctors: 6,
//     coordinates: { lat: 17.3850, lng: 78.4867 },
//     popular: false
//   }
// ];

export default function PanchakarmaCenters() {
  const [searchPincode, setSearchPincode] = useState("");
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [mapVisible, setMapVisible] = useState(true);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [centers, setCenters] = useState([]);
  // const [filteredCenters, setFilteredCenters] = useState([]);
  // const [searchPincode, setSearchPincode] = useState("");

  // Popular centers (top 5 by rating)
  const popularCenters = centers
    .filter(center => center.popular)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // Handle pincode search
  const handlePincodeSearch = () => {
    if (!searchPincode.trim()) {
      setFilteredCenters(centers);
      return;
    }

    const filtered = centers.filter(center => 
      center.pincode.startsWith(searchPincode) || 
      center.city.toLowerCase().includes(searchPincode.toLowerCase()) ||
      center.state.toLowerCase().includes(searchPincode.toLowerCase())
    );
    
    setFilteredCenters(filtered);
  };

  // Handle sort change
  const handleSortChange = (sortType) => {
    setSortBy(sortType);
    const sorted = [...filteredCenters].sort((a, b) => {
      if (sortType === "rating") return b.rating - a.rating;
      if (sortType === "doctors") return b.doctors - a.doctors;
      return a.name.localeCompare(b.name);
    });
    setFilteredCenters(sorted);
  };

  // Filter by state
  const filterByState = (state) => {
    if (state === "all") {
      setFilteredCenters(centers);
    } else {
      const filtered = centers.filter(center => center.state === state);
      setFilteredCenters(filtered);
    }
  };

  // Get unique states for filter
  const states = ["all", ...new Set(centers.map(center => center.state))];

  // Initialize Google Maps (simulated - in real app you'd use Google Maps API)
  // useEffect(() => {
    // In a real implementation, you would load Google Maps API here
    // For now, we'll simulate with a static image
  // }, []);

    useEffect(() => {
    async function loadCenters() {
      const res = await getCenters(); // call your API
      if (res && Array.isArray(res)) {
        setCenters(res);
        setFilteredCenters(res);
      } else {
        console.error("Failed to fetch centers:", res);
      }
    }

    loadCenters();
  }, []);


  // Handle center selection
  const handleCenterSelect = (center) => {
    setSelectedCenter(center);
    // In a real app, you would center the map on these coordinates
  };

  // Handle Enter key press for search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePincodeSearch();
    }
  };

  return (
    <div className="panchakarma-centers-root">
      {/* Hero Section */}
      <div className="centers-hero">
        <div className="hero-content">
          <h1>Find Panchakarma Centers</h1>
          <p className="hero-subtitle">
            Discover authentic Ayurvedic healing centers across India
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="centers-main">
        {/* Search and Filters Section */}
        <div className="search-section">
          <div className="search-container">
            <div className="search-box">
              <FaMapMarkerAlt className="search-icon" />
              <input
                type="text"
                placeholder="Enter PIN Code, City or State"
                value={searchPincode}
                onChange={(e) => setSearchPincode(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="search-btn" onClick={handlePincodeSearch}>
                <FaSearch />
                <span>Search</span>
              </button>
            </div>

            {/* Quick Filters */}
            <div className="quick-filters">
              <button 
                className="filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter />
                <span>Filters</span>
                {showFilters ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {showFilters && (
                <div className="filter-options">
                  <div className="filter-group">
                    <label>Sort by:</label>
                    <div className="sort-buttons">
                      <button 
                        className={`sort-btn ${sortBy === "rating" ? "active" : ""}`}
                        onClick={() => handleSortChange("rating")}
                      >
                        Highest Rated
                      </button>
                      <button 
                        className={`sort-btn ${sortBy === "doctors" ? "active" : ""}`}
                        onClick={() => handleSortChange("doctors")}
                      >
                        Most Doctors
                      </button>
                      <button 
                        className={`sort-btn ${sortBy === "name" ? "active" : ""}`}
                        onClick={() => handleSortChange("name")}
                      >
                        A to Z
                      </button>
                    </div>
                  </div>

                  <div className="filter-group">
                    <label>Filter by State:</label>
                    <div className="state-filters">
                      {states.map(state => (
                        <button
                          key={state}
                          className="state-btn"
                          onClick={() => filterByState(state)}
                        >
                          {state === "all" ? "All States" : state}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        {mapVisible && (
          <div className="map-section">
            <div className="map-header">
              <h2>
                <FaMapMarkerAlt /> Centers Map
              </h2>
              <button 
                className="map-toggle" 
                onClick={() => setMapVisible(false)}
              >
                Hide Map
              </button>
            </div>
            <div className="map-container">
              {centers.length > 0 && (
                <MapContainer
                  center={[20.5937, 78.9629]} // Center of India
                  zoom={5}
                  style={{ height: "100%", width: "100%", borderRadius: "12px" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {centers.map((center) => {
                    if (center.latitude && center.longitude) {
                      return (
                        <Marker
                          key={center.id}
                          position={[center.latitude, center.longitude]}
                          eventHandlers={{
                            click: () => handleCenterSelect(center),
                          }}
                        >
                          <Popup>
                            <div>
                              <h3>{center.name}</h3>
                              <p>{center.city}, {center.state}</p>
                              <p>Rating: {center.rating} ⭐</p>
                              <button onClick={() => handleCenterSelect(center)}>
                                View Details
                              </button>
                            </div>
                          </Popup>
                        </Marker>
                      );
                    }
                    return null;
                  })}
                </MapContainer>
              )}
            </div>
          </div>
        )}

        {/* Show Map Button when hidden */}
        {!mapVisible && (
          <div className="show-map-section">
            <button 
              className="show-map-btn"
              onClick={() => setMapVisible(true)}
            >
              <FaMapMarkerAlt /> Show Map
            </button>
          </div>
        )}

        {/* Popular Centers Section */}
        <section className="popular-centers">
          <h2>🏆 Popular Panchakarma Centers</h2>
          <p className="section-subtitle">Top-rated centers across India</p>
          
          <div className="popular-cards">
            {popularCenters.map(center => (
              <div 
                key={center.id} 
                className="popular-card"
                onClick={() => handleCenterSelect(center)}
              >
                <div className="popular-card-header">
                  <div className="center-rating">
                    <FaStar className="star-icon" />
                    <span>{center.rating}</span>
                  </div>
                  <div className="center-location">
                    <FaMapMarkerAlt />
                    <span>{center.city}, {center.state}</span>
                  </div>
                </div>
                
                <h3>{center.name}</h3>
                <p className="center-address">{center.address}</p>
                
                <div className="center-specialties">
                  {center.specialties.map((spec, index) => (
                    <span key={index} className="specialty-tag">{spec}</span>
                  ))}
                </div>
                
                <div className="center-details">
                  <div className="detail-item">
                    <FaUserMd />
                    <span>{center.doctors} Doctors</span>
                  </div>
                  <div className="detail-item">
                    <FaClock />
                    <span>{center.timing}</span>
                  </div>
                </div>
                
                <button className="view-center-btn">View Details</button>
              </div>
            ))}
          </div>
        </section>

        {/* All Centers Section */}
        <section className="all-centers">
          <div className="section-header">
            <h2>All Centers ({filteredCenters.length})</h2>
            <div className="results-info">
              Showing centers {searchPincode ? `for "${searchPincode}"` : "across India"}
            </div>
          </div>

          {filteredCenters.length === 0 ? (
            <div className="no-results">
              <FaSearch className="no-results-icon" />
              <h3>No centers found</h3>
              <p>Try searching with a different PIN code or city name</p>
            </div>
          ) : (
            <div className="centers-grid">
              {filteredCenters.map(center => (
                <div key={center.id} className="center-card">
                  <div className="card-header">
                    <div className="center-main-info">
                      <h3>{center.name}</h3>
                      <div className="center-location-badge">
                        <FaMapMarkerAlt />
                        <span>{center.city}, {center.state} - {center.pincode}</span>
                      </div>
                    </div>
                    <div className="center-rating-badge">
                      <FaStar />
                      <span>{center.rating}</span>
                    </div>
                  </div>
                  
                  <p className="center-address">{center.address}</p>
                  
                  <div className="center-specialties">
                    {center.specialties.slice(0, 3).map((spec, index) => (
                      <span key={index} className="specialty-tag">{spec}</span>
                    ))}
                    {center.specialties.length > 3 && (
                      <span className="specialty-more">+{center.specialties.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="center-contact">
                    <div className="contact-item">
                      <FaPhone />
                      <span>{center.phone}</span>
                    </div>
                    <div className="contact-item">
                      <FaGlobe />
                      <a href={`https://${center.website}`} target="_blank" rel="noopener noreferrer">
                        {center.website}
                      </a>
                    </div>
                    <div className="contact-item">
                      <FaClock />
                      <span>{center.timing}</span>
                    </div>
                    <div className="contact-item">
                      <FaUserMd />
                      <span>{center.doctors} Ayurvedic Doctors</span>
                    </div>
                  </div>
                  
                  <div className="card-actions">
                    <button className="action-btn primary">Book Appointment</button>
                    <button 
                      className="action-btn secondary"
                      onClick={() => handleCenterSelect(center)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Selected Center Modal */}
        {selectedCenter && (
          <div className="center-modal-overlay" onClick={() => setSelectedCenter(null)}>
            <div className="center-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{selectedCenter.name}</h2>
                <button className="close-modal" onClick={() => setSelectedCenter(null)}>
                  ×
                </button>
              </div>
              
              <div className="modal-content">
                <div className="modal-rating">
                  <FaStar className="star-icon" />
                  <span className="rating-value">{selectedCenter.rating}</span>
                  <span className="rating-text">Excellent</span>
                </div>
                
                <div className="modal-location">
                  <FaMapMarkerAlt />
                  <div>
                    <p>{selectedCenter.address}</p>
                    <p>{selectedCenter.city}, {selectedCenter.state} - {selectedCenter.pincode}</p>
                  </div>
                </div>
                
                <div className="modal-specialties">
                  <h4>Specialties</h4>
                  <div className="specialties-list">
                    {selectedCenter.specialties.map((spec, index) => (
                      <span key={index} className="specialty-tag">{spec}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-details">
                  <div className="detail-row">
                    <div className="detail-col">
                      <FaPhone />
                      <span>{selectedCenter.phone}</span>
                    </div>
                    <div className="detail-col">
                      <FaGlobe />
                      <a href={`https://${selectedCenter.website}`} target="_blank" rel="noopener noreferrer">
                        {selectedCenter.website}
                      </a>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-col">
                      <FaClock />
                      <span>{selectedCenter.timing}</span>
                    </div>
                    <div className="detail-col">
                      <FaUserMd />
                      <span>{selectedCenter.doctors} Ayurvedic Doctors</span>
                    </div>
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button className="modal-btn primary">Book Now</button>
                  <button className="modal-btn secondary">Save Center</button>
                  <button className="modal-btn outline">Get Directions</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}