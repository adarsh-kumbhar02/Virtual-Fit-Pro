import "./LowerBackTherapy.css";
import { useLocation } from "react-router-dom";

import AICoach from "../../components/AICoach/AICoach";

function LowerBackTherapy() {

    const { state } = useLocation();

    const plan = state || {};

    return (

        <div className="therapyPage">

            <div className="therapyHeader">

                <h1>🩺 Lower Back Therapy</h1>

                <p>
                    AI Guided Rehabilitation Session
                </p>

            </div>

            <div className="therapyContainer">

                {/* LEFT */}

                <div className="therapyLeft">

                    <div className="therapyCard">

                        <h2>Today's Exercise</h2>

                        <h1>🏋 Squats</h1>

                        <div className="planInfo">

                            <p><strong>Difficulty :</strong> {plan.difficulty}</p>

                            <p><strong>Sets :</strong> {plan.sets}</p>

                            <p><strong>Reps :</strong> {plan.reps}</p>

                            <p><strong>Rest :</strong> {plan.rest}</p>

                        </div>

                    </div>

                    <div className="therapyCard">

                        <h2>Safety Tips</h2>

                        <ul>

                            <li>✔ Keep your spine neutral.</li>

                            <li>✔ Don't rush the movement.</li>

                            <li>✔ Stop if pain increases.</li>

                            <li>✔ Keep breathing normally.</li>

                        </ul>

                    </div>

                </div>

                {/* CENTER */}

                <div className="therapyCenter">

                    <div className="cameraPlaceholder">

                        📷

                        <p>

                            Therapy Camera

                        </p>

                        <small>

                            We'll connect your AI Squat model here.

                        </small>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="therapyRight">

                    <AICoach

                        counter={0}

                        feedback="good"

                        feedbackMsg="Ready to Start"

                        currentPose="Squats"

                        angle={0}

                        stage="Waiting"

                        timer="00:00"

                        correctReps={0}

                        wrongReps={0}

                        bodyAnalysis={{

                            head:true,

                            shoulder:true,

                            back:true,

                            hip:true,

                            knee:true,

                            feet:true,

                        }}

                    />

                </div>

            </div>

        </div>

    );

}

export default LowerBackTherapy;