import "./Physiology.css";
import { useNavigate } from "react-router-dom";

function Physiology() {

  const navigate = useNavigate();

  const conditions = [
    {
      title: "Lower Back Pain",
      icon: "🦴",
      active: true,
      route: "/lower-back-assessment",
    },
    {
      title: "Neck Pain",
      icon: "💆",
      active: false,
    },
    {
      title: "Knee Pain",
      icon: "🦵",
      active: false,
    },
    {
      title: "Shoulder Pain",
      icon: "💪",
      active: false,
    },
    {
      title: "Weight Loss",
      icon: "⚖️",
      active: false,
    },
    {
      title: "Muscle Gain",
      icon: "🏋️",
      active: false,
    },
  ];

  return (
    <div className="physiologyPage">

      <h1>🩺 AI Physiotherapy Assistant</h1>

      <p>
        Choose your condition to receive an AI-guided
        rehabilitation plan.
      </p>

      <div className="conditionGrid">

        {conditions.map((item, index) => (

          <div
            key={index}
            className={`conditionCard ${
              item.active ? "activeCard" : "disabledCard"
            }`}
            onClick={() => {
              if (item.active) navigate(item.route);
            }}
          >

            <div className="conditionIcon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>
              {item.active
                ? "Start Assessment"
                : "Coming Soon"}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Physiology;