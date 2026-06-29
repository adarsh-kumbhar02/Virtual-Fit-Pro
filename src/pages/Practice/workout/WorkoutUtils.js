// =============================================
// WorkoutUtils.js
// Common utility functions used by AI Workout
// Reusable for Workout + Physiotherapy modules
// =============================================

// Convert radians to degrees
export const radiansToDegrees = (rad) => {
  return (rad * 180) / Math.PI;
};

// ------------------------------------------------
// Calculate angle between 3 body landmarks
// ------------------------------------------------
export function findAngle(p1, p2, p3) {
  const radians =
    Math.atan2(p3.y - p2.y, p3.x - p2.x) -
    Math.atan2(p1.y - p2.y, p1.x - p2.x);

  let angle = Math.abs(radiansToDegrees(radians));

  if (angle > 180) {
    angle = 360 - angle;
  }

  return Math.round(angle);
}

// ------------------------------------------------
// Calculate workout accuracy
// ------------------------------------------------
export function calculateAccuracy(correctReps, wrongReps) {
  const total = correctReps + wrongReps;

  if (total === 0) return 0;

  return Math.round((correctReps / total) * 100);
}

// ------------------------------------------------
// Calories estimation
// Can be improved later based on weight & exercise
// ------------------------------------------------
export function calculateCalories(reps) {
  return (reps * 0.45).toFixed(1);
}

// ------------------------------------------------
// Format seconds into mm:ss
// ------------------------------------------------
export function formatTime(totalSeconds) {
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;

  return (
    String(min).padStart(2, "0") +
    ":" +
    String(sec).padStart(2, "0")
  );
}

// ------------------------------------------------
// Visibility check
// Returns true if required landmarks are visible
// ------------------------------------------------
export function landmarksVisible(results, landmarks) {
  if (!results) return false;

  let visibility = 0;

  landmarks.forEach((index) => {
    visibility += results[index].visibility;
  });

  visibility /= landmarks.length;

  return visibility > 0.9;
}

// ------------------------------------------------
// Calculate posture score (0-100)
// Used in Body Analysis
// ------------------------------------------------
export function postureScore(feedback) {
  switch (feedback) {
    case "good":
      return 100;

    case "warning":
      return 80;

    case "wrong":
      return 50;

    default:
      return 0;
  }
}

// ------------------------------------------------
// Body status helper
// ------------------------------------------------
export function bodyStatus(condition) {
  return condition ? "Good" : "Needs Improvement";
}