import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { Pose } from "@mediapipe/pose";
import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AICoach from "../../../components/AICoach/AICoach";

import * as poseAll from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { workoutImages } from "../../../workoutposedata/workoutImages";
import { workoutInstructions } from "../../../workoutposedata/workoutInstructions";
import useState from "react-usestateref";
import DropDown from "../../../components/DropDown/DropDown";
import { fstore } from "../../../firebaseconfig/firebaseconfig";
import RotateDevice from "../../../components/RotateDevice/RotateDevice";
import {
  beginner_exercise_pack,
  inter_exercise_pack,
  adv_exercise_pack,
} from "./workoutData";
import "./workout-Practice.css";

const radians_to_degrees = (rad) => (rad * 180.0) / Math.PI;

function find_angle(p1, p2, p3) {
  let angle_radians =
    Math.atan2(p3.y - p2.y, p3.x - p2.x) -
    Math.atan2(p1.y - p2.y, p1.x - p2.x);
  let angle_degrees = radians_to_degrees(angle_radians);
  if (angle_degrees > 180.0) angle_degrees = 360 - angle_degrees;
  return Math.abs(angle_degrees);
}

function workout_Practice() {

  // 🎙️ VOICE COACH
  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 1;
    msg.pitch = 1;
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
  };

  async function addRecentData() {
    if (counterRef.current > 0) {
      try {
        const dataRef = doc(fstore, "users", localStorage.getItem("id"));
        await updateDoc(dataRef, {
          recentData: arrayUnion({
            pose_name: prevPoseRef.current,
            level: level,
            time: Date().toString(),
            repetition: counterRef.current,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const level = params.get("level");

  let exercise_pack = beginner_exercise_pack;
  if (level == "Intermediate") exercise_pack = inter_exercise_pack;
  if (level == "Advanced") exercise_pack = adv_exercise_pack;

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const connect = window.drawConnectors;
  const land = window.drawLandmarks;
  const rectangle = window.drawRectangle;

  let camera = null;
  let poseResults;
  let current_exercise;
  const stageRef = useRef("DOWN");
  let angle_deg;
  const repEvaluatedRef = useRef(false);
  const lastVoiceRef = useRef("");

        const speakOnce = (text) => {
            if (lastVoiceRef.current === text) return;

            lastVoiceRef.current = text;

            speechSynthesis.cancel();

            const msg = new SpeechSynthesisUtterance(text);

            msg.rate = 1;
            msg.pitch = 1;

            speechSynthesis.speak(msg);

            setTimeout(() => {
              lastVoiceRef.current = "";
            }, 2000);
          };

  const [counter, setCounter, counterRef] = useState(0);
  const [currentPose, setCurrentPose, currentPoseRef] = useState(
    exercise_pack.at(0).name
  );
  const [prevPose, setPrevPose, prevPoseRef] = useState();
  const [toggleImage, setToggleImage] = useState(true);
  const [showMessage, setShowMessage] = useState(true);

  const [feedback, setFeedback] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
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

  const [correctReps, setCorrectReps] = useState(0);
  const [wrongReps, setWrongReps] = useState(0);

  const workoutStart = useRef(Date.now());
  const [timer, setTimer] = useState("00:00");
 

  const handleUpdate = async () => {
    try {
      const dataRef = doc(fstore, "users", localStorage.getItem("id"));
      await updateDoc(dataRef, {
        [`${level}.${currentPoseRef.current}`]:
          parseInt(localStorage.getItem(currentPoseRef.current)) + 1,
      });
    } catch (err) {
      console.log(err);
    }
  };

  function incrementCounter() {
    setCounter((prevCounter) => prevCounter + 1);
    handleUpdate();
  }

  function resetCounter() {
    setCounter(0);
  }

  useEffect(() => {
    addRecentData();
    resetCounter();
    setPrevPose(currentPose);
  }, [currentPose]);

  useEffect(() => {
    return () => {
      addRecentData();
      camera?.stop();
    };
  }, []);

  function onResults(results) {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    try {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

      connect(canvasCtx, results.poseLandmarks, poseAll.POSE_CONNECTIONS, {
        color: "white",
        lineWidth: 3,
      });

      land(canvasCtx, results.poseLandmarks, {
        lineWidth: 3,
        color: "white",
        fillColor: "rgb(255,138,0)",
      });

      rectangle(canvasCtx, results.poseLandmarks, {
        lineWidth: 3,
        color: "blue",
      });

      canvasCtx.restore();

      poseResults = results.poseWorldLandmarks;
      current_exercise = exercise_pack.find(
        (ex) => ex.name === currentPoseRef.current
      );

      const { pose_landmark_1, pose_landmark_2, pose_landmark_3 } = current_exercise;

      const avg_visibility =
        (poseResults[pose_landmark_1].visibility +
          poseResults[pose_landmark_2].visibility +
          poseResults[pose_landmark_3].visibility) /
        3;

      if (avg_visibility > 0.9) {
        setShowMessage(false);

        angle_deg = find_angle(
          poseResults[pose_landmark_1],
          poseResults[pose_landmark_2],
          poseResults[pose_landmark_3]
        );

        setCurrentAngle(Math.round(angle_deg));
        setBodyAnalysis({

  head:
    Math.abs(poseResults[7].y - poseResults[8].y) < 0.08,

  shoulder:
    Math.abs(poseResults[11].y - poseResults[12].y) < 0.10,

  back:
    Math.abs(poseResults[11].z - poseResults[23].z) < 0.35,

  hip:
    Math.abs(poseResults[23].y - poseResults[24].y) < 0.10,

  knee:
    Math.abs(poseResults[25].y - poseResults[26].y) < 0.15,

  feet:
    Math.abs(poseResults[27].y - poseResults[28].y) < 0.12,

});

        //  SMART AI FEEDBACK
       let isGoodForm = true;
        if (angle_deg > current_exercise.max_angle + 15) {

          isGoodForm = false;

          setFeedback("wrong");
          setFeedbackMsg("❌ Arm not fully extended");
          speakOnce("Arm not fully extended");

      }
      else if (angle_deg < current_exercise.min_angle - 15) {

          isGoodForm = false;

          setFeedback("wrong");
          setFeedbackMsg("❌ Elbow too forward");
          speakOnce("Elbow too forward");

      }
      else if (Math.abs(poseResults[11].z - poseResults[23].z) > 0.4) {

          isGoodForm = false;

          setFeedback("wrong");
          setFeedbackMsg("❌ Back not straight");
          speakOnce("Keep your back straight");

      }
      else {

          setFeedback("good");
          setFeedbackMsg("✅ Good Form");

      }


        // ⭐ REP LOGIC (UNCHANGED)
        if (angle_deg > current_exercise.max_angle) {
          stageRef.current = "DOWN";
          setCurrentStage("DOWN");
          repEvaluatedRef.current = false;
        }
        if (
          angle_deg < current_exercise.min_angle &&
          stageRef.current === "DOWN" &&
          !repEvaluatedRef.current
        ) {

          stageRef.current = "UP";
          setCurrentStage("UP");

          incrementCounter();

          repEvaluatedRef.current = true;

          if (isGoodForm) {
              setCorrectReps(prev => prev + 1);
              speakOnce("Excellent repetition");
          }
          else {
              setWrongReps(prev => prev + 1);
              speakOnce("Please improve your posture");
          }

        }
      } else {
        setShowMessage(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);

    if (webcamRef.current) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await pose.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  useEffect(() => {
  const interval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - workoutStart.current) / 1000);

    const min = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const sec = String(elapsed % 60).padStart(2, "0");

    setTimer(`${min}:${sec}`);
  }, 1000);

  return () => clearInterval(interval);
}, []);

  if (window.innerWidth < 640) return <RotateDevice />;

  return (
    <div className="workout-Practice">
      <h2 className="workout_practice_heading">Workout - {level}</h2>

      <div className="dropdown_container">
        {showMessage && <div className="visible">Please be in camera range</div>}

        <DropDown
          exercise_pack={exercise_pack}
          currentPose={currentPose}
          setCurrentPose={setCurrentPose}
        />
      </div>

      <div className="flexbox_container">

    {/* LEFT PANEL */}

    <div className="leftPanel">

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
                ></canvas>

            </div>

        </div>

        <div className="counterCard">

            <div className="counterTitle">
                Repetitions
            </div>

            <div className="counter">
                {counter}
            </div>

        </div>

    </div>


    {/* RIGHT PANEL */}

    <div className="rightPanel">

        <AICoach
          counter={counter}
          feedback={feedback}
          feedbackMsg={feedbackMsg}
          currentPose={currentPose}
          angle={currentAngle}
          stage={currentStage}
          timer={timer}
          correctReps={correctReps}
          wrongReps={wrongReps}
          bodyAnalysis={bodyAnalysis}
        />

    </div>

</div>


<div className="bottomSection">

    <div className="workout_pose_image_container">

        <img
            alt=""
            src={
                workoutImages[currentPose] ||
                workoutImages[currentPose?.replace(/([A-Z])/g, " $1").trim()] ||
                workoutImages["No Pose"]
            }
            onClick={() => setToggleImage(false)}
        />

    </div>

    <div className="workout_pose_text_container">

        <textarea
            readOnly
            value={workoutInstructions[currentPose]}
        />

    </div>

</div>
    </div>
  );
}

export default workout_Practice;
