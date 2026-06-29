import "./AICoach.css";

function AICoach({
  counter,
  feedback,
  feedbackMsg,
  currentPose,
  angle,
  stage,
  timer = "00:00",
  correctReps = 0,
  wrongReps = 0,
  bodyAnalysis,
}) {
  const total = correctReps + wrongReps;

  const accuracy =
    total === 0 ? 0 : Math.round((correctReps / total) * 100);

  const calories = (counter * 0.45).toFixed(1);
  const bodyScore = bodyAnalysis
  ? Object.values(bodyAnalysis).filter(Boolean).length
  : 0;

const formScore = Math.round((bodyScore / 6) * 100);

  return (
    <div className="aiCoach">

      <div className="coachHeader">
        🤖 AI Coach
      </div>

      <div
        className={`statusCard ${
          feedback === "good" ? "goodStatus" : "badStatus"
        }`}
      >
        {feedbackMsg || "Waiting for Pose..."}
      </div>

      <div className="coachGrid">

        <div className="coachItem">
          <h5>Exercise</h5>
          <span>{currentPose}</span>
        </div>

        <div className="coachItem">
          <h5>Angle</h5>
          <span>{angle}°</span>
        </div>

        <div className="coachItem">
          <h5>Repetitions</h5>
          <span>{counter}</span>
        </div>

        <div className="coachItem">
          <h5>Stage</h5>
          <span>{stage}</span>
        </div>

        <div className="coachItem">
          <h5>Correct</h5>
          <span>{correctReps}</span>
        </div>

        <div className="coachItem">
          <h5>Incorrect</h5>
          <span>{wrongReps}</span>
        </div>

        <div className="coachItem">
          <h5>Accuracy</h5>
          <span>{accuracy}%</span>
        </div>

        <div className="coachItem">
          <h5>Calories</h5>
          <span>{calories} kcal</span>
        </div>

        <div className="coachItem fullWidth">
            <h5>Workout Time</h5>
            <span>{timer}</span>
        </div>

    {/* =======================
        BODY ANALYSIS
    ======================= */}

    <div className="bodySection">

    <h4>🧠 Body Analysis</h4>

    <div className="bodyRow">
        <span>Head</span>
        <strong className={bodyAnalysis?.head ? "good" : "bad"}>
        {bodyAnalysis?.head ? "✔" : "✖"}
        </strong>
    </div>

    <div className="bodyRow">
        <span>Shoulder</span>
        <strong className={bodyAnalysis?.shoulder ? "good" : "bad"}>
        {bodyAnalysis?.shoulder ? "✔" : "✖"}
        </strong>
    </div>

    <div className="bodyRow">
        <span>Back</span>
        <strong className={bodyAnalysis?.back ? "good" : "bad"}>
        {bodyAnalysis?.back ? "✔" : "✖"}
        </strong>
    </div>

    <div className="bodyRow">
        <span>Hip</span>
        <strong className={bodyAnalysis?.hip ? "good" : "bad"}>
        {bodyAnalysis?.hip ? "✔" : "✖"}
        </strong>
    </div>

    <div className="bodyRow">
        <span>Knee</span>
        <strong className={bodyAnalysis?.knee ? "good" : "bad"}>
        {bodyAnalysis?.knee ? "✔" : "✖"}
        </strong>
    </div>

    <div className="bodyRow">
        <span>Feet</span>
        <strong className={bodyAnalysis?.feet ? "good" : "bad"}>
        {bodyAnalysis?.feet ? "✔" : "✖"}
        </strong>
    </div>

    </div>

    <div className="scoreCard">

    <h4>Overall Form Score</h4>

    <div className="scoreCircle">
        {formScore}%
    </div>

    </div>

    </div>

    </div>

  );
}

export default AICoach;