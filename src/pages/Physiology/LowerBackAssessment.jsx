import "./LowerBackAssessment.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LowerBackAssessment() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "Male",
    painLevel: 5,
    painDuration: "",
    sittingHours: "",
    activityLevel: "Moderate",
    painLocation: "Lower Back",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const generatePlan = () => {

    navigate("/lower-back-recommendation", {
      state: formData,
    });

  };

  return (
    <div className="assessmentPage">

      <h1>🦴 Lower Back Assessment</h1>

      <div className="assessmentCard">

        <div className="formGroup">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div className="formGroup">
          <label>Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />
        </div>

        <div className="formGroup">
          <label>Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>

        <div className="formGroup">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="formGroup">
          <label>Pain Level (1-10)</label>

          <input
            type="range"
            min="1"
            max="10"
            name="painLevel"
            value={formData.painLevel}
            onChange={handleChange}
          />

          <strong>{formData.painLevel}</strong>

        </div>

        <div className="formGroup">
          <label>Pain Duration</label>

          <select
            name="painDuration"
            value={formData.painDuration}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Less than 1 week</option>
            <option>1-4 weeks</option>
            <option>1-3 months</option>
            <option>More than 3 months</option>
          </select>
        </div>

        <div className="formGroup">
          <label>Sitting Hours / Day</label>

          <input
            type="number"
            name="sittingHours"
            value={formData.sittingHours}
            onChange={handleChange}
          />
        </div>

        <div className="formGroup">
          <label>Activity Level</label>

          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Moderate</option>
            <option>High</option>
          </select>
        </div>

        <button
          className="generateBtn"
          onClick={generatePlan}
        >
          Generate AI Plan
        </button>

      </div>

    </div>
  );
}

export default LowerBackAssessment;