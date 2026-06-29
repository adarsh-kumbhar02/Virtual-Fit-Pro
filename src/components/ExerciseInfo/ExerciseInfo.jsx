import "./ExerciseInfo.css";

function ExerciseInfo({
  currentPose,
  workoutImages,
  workoutInstructions,
}) {
  return (
    <div className="bottomSection">

      <div className="workout_pose_image_container">

        <img
          alt=""
          src={
            workoutImages[currentPose] ||
            workoutImages[currentPose?.replace(/([A-Z])/g, " $1").trim()] ||
            workoutImages["No Pose"]
          }
        />

      </div>

      <div className="workout_pose_text_container">

        <textarea
          readOnly
          value={workoutInstructions[currentPose]}
        />

      </div>

    </div>
  );
}

export default ExerciseInfo;