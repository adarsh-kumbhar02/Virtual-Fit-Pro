export function generateRecommendation(data) {

    const pain = Number(data.painLevel);

    let plan = {
        severity: "",
        exercise: "Squats",
        sets: 0,
        reps: 0,
        rest: "",
        difficulty: "",
        advice: "",
    };

    if (pain <= 3) {

        plan.severity = "Mild";

        plan.sets = 3;

        plan.reps = 12;

        plan.rest = "30 sec";

        plan.difficulty = "Beginner";

        plan.advice =
            "Maintain good posture and perform exercises slowly.";

    }

    else if (pain <= 6) {

        plan.severity = "Moderate";

        plan.sets = 3;

        plan.reps = 10;

        plan.rest = "45 sec";

        plan.difficulty = "Easy";

        plan.advice =
            "Avoid sudden movements and focus on proper technique.";

    }

    else {

        plan.severity = "Severe";

        plan.sets = 2;

        plan.reps = 6;

        plan.rest = "60 sec";

        plan.difficulty = "Assisted";

        plan.advice =
            "Perform only assisted squats. Stop immediately if pain increases.";

    }

    return plan;

}