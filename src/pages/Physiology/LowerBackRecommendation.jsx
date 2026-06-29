import "./LowerBackRecommendation.css";
import { useLocation, useNavigate } from "react-router-dom";
import { generateRecommendation } from "./physioLogic";

function LowerBackRecommendation() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Redirect safely if opened directly
  if (!state) {
    return (
      <div className="recommendationPage">
        <h1>No Assessment Found</h1>
        <button
          className="startBtn"
          onClick={() => navigate("/lower-back-assessment")}
        >
          Go to Assessment
        </button>
      </div>
    );
  }

  const plan = generateRecommendation(state);

  return (
    <div className="recommendationPage">

      <h1>🩺 AI Physiotherapy Treatment Plan</h1>

      <div className="recommendationCard">

        <div className="planBadge">
          {plan.severity} Lower Back Pain
        </div>

        <h2>🤖 Personalized Therapy Recommendation</h2>

        <div className="planSection">

          <div className="recommendationRow">
            <span>🏋️ Recommended Exercise</span>
            <strong>{plan.exercise}</strong>
          </div>

          <div className="recommendationRow">
            <span>📊 Difficulty</span>
            <strong>{plan.difficulty}</strong>
          </div>

          <div className="recommendationRow">
            <span>🔁 Sets</span>
            <strong>{plan.sets}</strong>
          </div>

          <div className="recommendationRow">
            <span>💪 Repetitions</span>
            <strong>{plan.reps}</strong>
          </div>

          <div className="recommendationRow">
            <span>⏱️ Rest Time</span>
            <strong>{plan.rest}</strong>
          </div>

        </div>

        <div className="recommendationAdvice">

          <h3>💡 AI Advice</h3>

          <p>{plan.advice}</p>

        </div>

        <div className="warningBox">

          <h3>⚠️ Safety Instructions</h3>

          <ul>
            <li>Maintain a neutral spine throughout the exercise.</li>
            <li>Move slowly and avoid jerky movements.</li>
            <li>Keep your knees aligned with your feet.</li>
            <li>Stop immediately if pain increases.</li>
            <li>Breathe normally during each repetition.</li>
          </ul>

        </div>

        <div className="expectedRecovery">

          <h3>📈 Expected Recovery Timeline</h3>

          <div className="recommendationRow">
            <span>Mild Pain</span>
            <strong>1 - 2 Weeks</strong>
          </div>

          <div className="recommendationRow">
            <span>Moderate Pain</span>
            <strong>2 - 4 Weeks</strong>
          </div>

          <div className="recommendationRow">
            <span>Severe Pain</span>
            <strong>Consult Physiotherapist</strong>
          </div>

        </div>

        <button
          className="startBtn"
          onClick={() =>
            navigate("/workout-practice?therapy=true", {
              state: plan,
            })
          }
        >
          🚀 Start Therapy Session
        </button>

      </div>

    </div>
  );
}

export default LowerBackRecommendation;