import React, { useEffect } from "react";
import "../App.css";
import MainDash from "../components/MainDash/MainDash";
import { fstore } from "../firebaseconfig/firebaseconfig";
import { query, getDocs, collection, where } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

var returnedData;

const Dashboard = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(fstore, "users"),
        where("uid", "==", currentUser.uid)
      );
      const docs = await getDocs(q);
      returnedData = Object.assign(
        docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )[0];

      //Beginner
      localStorage.setItem("Left Curl", returnedData.Beginner["Left Curl"]);
      localStorage.setItem(
        "Lateral Raise",
        returnedData.Beginner["Lateral Raise"]
      );
      localStorage.setItem("Right Curl", returnedData.Beginner["Right Curl"]);

      //Intermediate
      localStorage.setItem("Squats", returnedData.Intermediate["Squats"]);
      localStorage.setItem("Lunges", returnedData.Intermediate["Lunges"]);
      localStorage.setItem(
        "Side Lunge",
        returnedData.Intermediate["Side Lunge"]
      );

      //Advanced
      localStorage.setItem("Plie Squat", returnedData.Advanced["Plie Squat"]);
      localStorage.setItem(
        "Tricep Kickback",
        returnedData.Advanced["Tricep Kickback"]
      );

      localStorage.setItem("id", returnedData.id);
    };

    getData();
  }, []);
  return <MainDash />;
};
<div className="fade-in">
  <MainDash />
</div>

export default Dashboard;
