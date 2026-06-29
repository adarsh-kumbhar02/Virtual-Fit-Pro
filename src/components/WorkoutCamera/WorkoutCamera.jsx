import Webcam from "react-webcam";
import "./WorkoutCamera.css";

function WorkoutCamera({ webcamRef, canvasRef }) {
  return (
    <div className="workout_camera_and_canvas">

      <Webcam
        ref={webcamRef}
        width="640px"
        height="480px"
      />

      <div className="workout_canvas_container">
        <canvas
          ref={canvasRef}
          width="640px"
          height="480px"
        />
      </div>

    </div>
  );
}

export default WorkoutCamera;