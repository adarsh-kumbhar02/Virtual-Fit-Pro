import React from "react";

export default function Learn() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Learn Module</h1>
      <p>Improve your workout knowledge and posture understanding.</p>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={cardStyle}>
          <h3>🧠 Posture Basics</h3>
          <p>Learn how correct body posture improves performance.</p>
        </div>

        <div style={cardStyle}>
          <h3>🔥 Warmup Theory</h3>
          <p>Understand muscle activation before starting exercises.</p>
        </div>

        <div style={cardStyle}>
          <h3>💪 Strength Training</h3>
          <p>Learn how AI analyzes joint angles using MediaPipe Pose.</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#f3e5f5",
  padding: "20px",
  borderRadius: "12px",
  width: "250px",
};
