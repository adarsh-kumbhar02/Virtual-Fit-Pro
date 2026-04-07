import React, { useState } from "react";

export default function Physiology() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    const h = height / 100;
    const result = (weight / (h * h)).toFixed(2);
    setBmi(result);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Physiology Module</h1>

      <h3>BMI Calculator</h3>

      <input
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <input
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />

      <button onClick={calculateBMI}>Calculate</button>

      {bmi && <h3>Your BMI: {bmi}</h3>}

      <h3>Physiology Tips</h3>
      <ul>
        <li>Stay hydrated during workouts 💧</li>
        <li>Maintain proper breathing 🫁</li>
        <li>Take rest between sets 💤</li>
      </ul>
    </div>
  );
}
