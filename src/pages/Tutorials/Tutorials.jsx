import React from "react";

export default function Tutorials() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Tutorials Module</h1>
      <p>Follow guided exercise tutorials.</p>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={videoCard}>
          <h3>🏋️ Bicep Curl Tutorial</h3>
          <p>Step-by-step AI assisted workout practice.</p>
        </div>

        <div style={videoCard}>
          <h3>🧘 Stretching Basics</h3>
          <p>Learn safe stretching posture techniques.</p>
        </div>

        <div style={videoCard}>
          <h3>🔥 Cardio Training</h3>
          <p>Beginner-friendly workout walkthrough.</p>
        </div>
      </div>
    </div>
  );
}

const videoCard = {
  background: "#ffe0b2",
  padding: "20px",
  borderRadius: "12px",
  width: "250px",
};
