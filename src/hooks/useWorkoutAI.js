import { useState, useRef, useEffect } from "react";
import { Pose } from "@mediapipe/pose";
import * as poseAll from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";

import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { fstore } from "../../../firebaseconfig/firebaseconfig";
import { findAngle } from "./WorkoutUtils";

export default function useWorkoutAI(
    level,
    exercisePack,
) {

  // =============================
  // Camera
  // =============================
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  // ============================
// MEDIAPIPE
// ============================

const cameraRef = useRef(null);

const poseRef = useRef(null);

const connect = window.drawConnectors;

const land = window.drawLandmarks;

const rectangle = window.drawRectangle;

  // =============================
  // Workout
  // =============================
  const [counter, setCounter] = useState(0);

  const [currentPose, setCurrentPose] = useState("");

  const [feedback, setFeedback] = useState("");

    const [feedbackMsg, setFeedbackMsg] = useState("");
    // =============================
    // BODY ANALYSIS
    // =============================

    const [bodyAnalysis, setBodyAnalysis] = useState({

        head: true,

        shoulder: true,

        back: true,

        hip: true,

        knee: true,

        feet: true,

    });

  const [currentAngle, setCurrentAngle] = useState(0);

  const [currentStage, setCurrentStage] = useState("Waiting");

  // =============================
  // Statistics
  // =============================
  const [correctReps, setCorrectReps] = useState(0);

  const [wrongReps, setWrongReps] = useState(0);
  // =============================
// TIMER
// =============================

const workoutStartRef = useRef(Date.now());

const [timer, setTimer] = useState("00:00");

const formatTime = (seconds) => {

    const min = Math.floor(seconds / 60);

    const sec = seconds % 60;

    return (
        String(min).padStart(2, "0") +
        ":" +
        String(sec).padStart(2, "0")
    );

};

useEffect(() => {

    const interval = setInterval(() => {

        const seconds = Math.floor(

            (Date.now() - workoutStartRef.current) / 1000

        );

        setTimer(formatTime(seconds));

    }, 1000);

    return () => clearInterval(interval);

}, []);

  // =============================
// AI
// =============================

const stageRef = useRef("DOWN");
const repEvaluatedRef = useRef(false);
const lastVoiceRef = useRef("");

// -----------------------------
// Voice Coach
// -----------------------------
const speak = (text) => {
  speechSynthesis.cancel();

  const msg = new SpeechSynthesisUtterance(text);

  msg.rate = 1;
  msg.pitch = 1;

  speechSynthesis.speak(msg);
};

// =============================
// FIREBASE
// =============================

async function saveWorkout(level) {

    if (counter === 0) return;

    try {

        const ref = doc(
            fstore,
            "users",
            localStorage.getItem("id")
        );

        await updateDoc(ref, {

            recentData: arrayUnion({

                pose_name: currentPose,

                level: level,

                repetition: counter,

                accuracy:
                    correctReps + wrongReps === 0
                        ? 0
                        : Math.round(
                              (correctReps /
                                  (correctReps + wrongReps)) *
                                  100
                          ),

                calories: (counter * 0.45).toFixed(1),

                completedAt: new Date().toISOString(),

            }),

        });

    } catch (err) {

        console.log(err);

    }

}

async function updateExerciseProgress(level) {

    try {

        const ref = doc(
            fstore,
            "users",
            localStorage.getItem("id")
        );

        await updateDoc(ref, {

            [`${level}.${currentPose}`]:
                parseInt(localStorage.getItem(currentPose) || 0) + 1,

        });

    }

    catch (err) {

        console.log(err);

    }

}

// Speak only once
const speakOnce = (text) => {
  if (lastVoiceRef.current === text) return;

  lastVoiceRef.current = text;

  speak(text);

  setTimeout(() => {
    lastVoiceRef.current = "";
  }, 2000);
};

// ============================
// CREATE MEDIAPIPE
// ============================
// ============================
// AI RESULT CALLBACK
// ============================

const onResults = (results) => {

    const canvasElement = canvasRef.current;

    if (!canvasElement) return;

    const canvasCtx = canvasElement.getContext("2d");

    canvasCtx.save();

    canvasCtx.clearRect(
        0,
        0,
        canvasElement.width,
        canvasElement.height
    );

    canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
    );

    connect(
        canvasCtx,
        results.poseLandmarks,
        poseAll.POSE_CONNECTIONS,
        {
            color: "white",
            lineWidth: 3,
        }
    );

    land(canvasCtx, results.poseLandmarks, {
        color: "white",
        fillColor: "#ff8a00",
        lineWidth: 3,
    });

    rectangle(canvasCtx, results.poseLandmarks, {
        color: "#3b82f6",
        lineWidth: 3,
    });

    canvasCtx.restore();

    // =====================================
// AI POSE DETECTION
// =====================================

try {

    const poseResults = results.poseWorldLandmarks;

    if (!poseResults) return;

    const exercise = exercisePack.find(
        (ex) => ex.name === currentPose
    );

    if (!exercise) return;

    const {
        pose_landmark_1,
        pose_landmark_2,
        pose_landmark_3,
    } = exercise;

    const avgVisibility =
        (
            poseResults[pose_landmark_1].visibility +
            poseResults[pose_landmark_2].visibility +
            poseResults[pose_landmark_3].visibility
        ) / 3;

    if (avgVisibility < 0.9) {

        setFeedback("warning");
        setFeedbackMsg("📷 Please come into camera view");

        return;

    }

    const angle = findAngle(

        poseResults[pose_landmark_1],

        poseResults[pose_landmark_2],

        poseResults[pose_landmark_3]

    );

    setCurrentAngle(angle);
    // =====================================
// BODY ANALYSIS
// =====================================

setBodyAnalysis({

    head:

        Math.abs(
            poseResults[7].y -
            poseResults[8].y
        ) < 0.08,

    shoulder:

        Math.abs(
            poseResults[11].y -
            poseResults[12].y
        ) < 0.10,

    back:

        Math.abs(
            poseResults[11].z -
            poseResults[23].z
        ) < 0.35,

    hip:

        Math.abs(
            poseResults[23].y -
            poseResults[24].y
        ) < 0.10,

    knee:

        Math.abs(
            poseResults[25].y -
            poseResults[26].y
        ) < 0.15,

    feet:

        Math.abs(
            poseResults[27].y -
            poseResults[28].y
        ) < 0.12,

});
    // ======================================
// AI FEEDBACK
// ======================================

let isGoodForm = true;

if (angle > exercise.max_angle + 15) {

    isGoodForm = false;

    setFeedback("wrong");

    setFeedbackMsg("❌ Arm not fully extended");

    speakOnce("Arm not fully extended");

}

else if (angle < exercise.min_angle - 15) {

    isGoodForm = false;

    setFeedback("wrong");

    setFeedbackMsg("❌ Elbow too forward");

    speakOnce("Elbow too forward");

}

else if (

    Math.abs(

        poseResults[11].z -

        poseResults[23].z

    ) > 0.4

) {

    isGoodForm = false;

    setFeedback("wrong");

    setFeedbackMsg("❌ Keep your back straight");

    speakOnce("Keep your back straight");

}

else {

    setFeedback("good");

    setFeedbackMsg("✅ Good Form");

}

} catch (err) {

    console.log(err);

}
    // ======================================
// STAGE DETECTION
// ======================================

if (angle > exercise.max_angle) {

    stageRef.current = "DOWN";
    setCurrentStage("DOWN");

    repEvaluatedRef.current = false;

}

// ======================================
// REP COMPLETED
// ======================================

if (

    angle < exercise.min_angle &&

    stageRef.current === "DOWN" &&

    !repEvaluatedRef.current

) {

    stageRef.current = "UP";

    setCurrentStage("UP");

    repEvaluatedRef.current = true;

    setCounter((prev) => prev + 1);

    updateExerciseProgress(level);

    if (isGoodForm) {

        setCorrectReps((prev) => prev + 1);

        speakOnce("Excellent repetition");

    }

    else {

        setWrongReps((prev) => prev + 1);

        speakOnce("Please improve your posture");

    }

}

};
useEffect(() => {

    poseRef.current = new Pose({

        locateFile:(file)=>

        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`

    });

    poseRef.current.setOptions({

        modelComplexity:1,
        smoothLandmarks:true,
        minDetectionConfidence:0.5,
        minTrackingConfidence:0.5,

    });

    poseRef.current.onResults(onResults);

    if(webcamRef.current){

        cameraRef.current = new cam.Camera(

            webcamRef.current.video,

            {

                onFrame: async()=>{

                    await poseRef.current.send({

                        image:webcamRef.current.video

                    });

                },

                width:640,
                height:480,

            }

        );

        cameraRef.current.start();

    }

    return ()=>{

        cameraRef.current?.stop();

    };

},[]);

  return {

    webcamRef,
    canvasRef,

    cameraRef,

    poseRef,

    connect,

    land,

    rectangle,

    counter,
    setCounter,

    currentPose,
    setCurrentPose,

    feedback,
    setFeedback,

    feedbackMsg,
    setFeedbackMsg,

    currentAngle,
    setCurrentAngle,

    currentStage,
    setCurrentStage,

    timer,

    correctReps,
    setCorrectReps,

    wrongReps,
    setWrongReps,

    stageRef,

    repEvaluatedRef,

    lastVoiceRef,

    speak,
    speakOnce,

    saveWorkout,
    updateExerciseProgress,

    bodyAnalysis,

  };

}