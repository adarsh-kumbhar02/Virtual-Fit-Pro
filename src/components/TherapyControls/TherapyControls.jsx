import "./TherapyControls.css";

function TherapyControls({
  onStart,
  onPause,
  onFinish,
}) {
  return (
    <div className="therapyControls">

      <button
        className="startBtn"
        onClick={onStart}
      >
        ▶ Start Therapy
      </button>

      <button
        className="pauseBtn"
        onClick={onPause}
      >
        ⏸ Pause
      </button>

      <button
        className="finishBtn"
        onClick={onFinish}
      >
        ✔ Finish Session
      </button>

    </div>
  );
}

export default TherapyControls;