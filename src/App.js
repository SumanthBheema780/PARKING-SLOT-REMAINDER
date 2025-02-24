import React, { useState, useEffect } from "react";

function App() {
  const [slot, setSlot] = useState("");
  const [location, setLocation] = useState("");
  const [savedSlot, setSavedSlot] = useState(null);
  const [savedLocation, setSavedLocation] = useState(null);
  const [timestamp, setTimestamp] = useState(null);

  // Load saved data from localStorage
  useEffect(() => {
    const storedSlot = localStorage.getItem("parkingSlot");
    const storedLocation = localStorage.getItem("parkingLocation");
    const storedTimestamp = localStorage.getItem("parkingTimestamp");
    
    if (storedSlot) {
      setSavedSlot(storedSlot);
      setSavedLocation(storedLocation);
      setTimestamp(storedTimestamp);
    }
  }, []);

  // Save slot to localStorage
  const saveParkingSlot = () => {
    if (!slot) return alert("Please enter a parking slot!");

    const time = new Date().toLocaleString();
    localStorage.setItem("parkingSlot", slot);
    localStorage.setItem("parkingLocation", location);
    localStorage.setItem("parkingTimestamp", time);

    setSavedSlot(slot);
    setSavedLocation(location);
    setTimestamp(time);

    setSlot("");
    setLocation("");
  };

  // Clear saved data
  const clearParkingSlot = () => {
    localStorage.removeItem("parkingSlot");
    localStorage.removeItem("parkingLocation");
    localStorage.removeItem("parkingTimestamp");

    setSavedSlot(null);
    setSavedLocation(null);
    setTimestamp(null);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>🚗 Parking Slot Reminder</h2>
      
      <input
        type="text"
        placeholder="Enter Slot Number"
        value={slot}
        onChange={(e) => setSlot(e.target.value)}
        style={{ padding: "10px", margin: "10px", width: "200px" }}
      />

      <input
        type="text"
        placeholder="Enter Location (Optional)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ padding: "10px", margin: "10px", width: "200px" }}
      />
      
      <br />
      <button onClick={saveParkingSlot} style={buttonStyle}>Save Slot</button>
      <button onClick={clearParkingSlot} style={{ ...buttonStyle, backgroundColor: "red" }}>Clear Slot</button>

      {savedSlot && (
        <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f1f1f1", display: "inline-block", textAlign: "left" }}>
          <p><strong>📍 Saved Slot:</strong> {savedSlot}</p>
          {savedLocation && <p><strong>📍 Location:</strong> {savedLocation}</p>}
          <p><small><strong>🕒 Saved at:</strong> {timestamp}</small></p>
        </div>
      )}
    </div>
  );
}

// Button styling
const buttonStyle = {
  padding: "10px 15px",
  margin: "10px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export default App;
