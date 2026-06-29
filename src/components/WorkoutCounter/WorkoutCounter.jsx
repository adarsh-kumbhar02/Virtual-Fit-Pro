import "./WorkoutCounter.css";

function WorkoutCounter({ counter }) {
  return (
    <div className="counterCard">

      <div className="counterTitle">
        Repetitions
      </div>

      <div className="counter">
        {counter}
      </div>

    </div>
  );
}

export default WorkoutCounter;