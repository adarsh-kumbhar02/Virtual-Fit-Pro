import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { fstore } from "../../firebaseconfig/firebaseconfig";
import "./MainDash.css";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import Loading from "../Loading/Loading";

const MainDash = () => {
  const seriesBeginner = [
    {
      name: "",
      data: [],
    },
  ];

  const seriesIntermediate = [
    {
      name: "",
      data: [],
    },
  ];

  const seriesAdvanced = [
    {
      name: "",
      data: [],
    },
  ];
  var seriesArray = [];

  const [seriesData, setSeriesData] = useState(null);

  const fetchData = async () => {
    const docRef = doc(fstore, "users", localStorage.getItem("id"));
    const docSnap = await getDoc(docRef);

    setTimeout(() => {}, 10000);

    const dataDB = docSnap.data();

    const values = [dataDB.Beginner, dataDB.Intermediate, dataDB.Advanced];
    const seriesTempArray = [
      seriesBeginner,
      seriesIntermediate,
      seriesAdvanced,
    ];

    for (let index = 0; index < 3; index++) {
      seriesTempArray[index][0].name = dataDB.DifficultyLevels[index];
      console.log(dataDB.DifficultyLevels[index]);
      seriesTempArray[index][0].data.length = 0;

      for (let [key, value] of Object.entries(values[index])) {
        seriesTempArray[index][0].data.push({
          x: `${key}`,
          y: `${value}`,
        });
      }
      if (index == seriesArray.length) seriesArray.push(seriesTempArray[index]);
    }

    setSeriesData(seriesArray);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return seriesData === null ? (
  <Loading />
) : (
  <div className="MainDash">
    <h1>Dashboard</h1>

    <Cards data={seriesData} />

    {/* TABLE WRAPPER */}
    <div className="tableContainer">
  <div className="tableHeader">
    <h2 className="tableTitle">
  <span className="svgIcon">
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 14L10 8L14 12L20 6"
        stroke="url(#grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 6H20V12"
        stroke="url(#grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  </span>
  Recently Performed Exercises
</h2>
  </div>

  <Table />
</div>
  </div>
);
};

export default MainDash;
