import * as React from "react";
import { useState, useEffect } from "react";
import { fstore } from "../../firebaseconfig/firebaseconfig";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

import { doc, getDoc } from "firebase/firestore";

const makeStyles = (rep) => {
  if (rep > 15) {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (rep < 5) {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};

export default function BasicTable() {
  const [recentData, setRecentData] = useState([]);

  const fetchData = async () => {
    const docRef = doc(fstore, "users", localStorage.getItem("id"));
    const docSnap = await getDoc(docRef);

    setRecentData(docSnap.data().recentData.reverse());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Table">

      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029", marginTop: "20px" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Pose</TableCell>
              <TableCell align="left">Difficulty Level</TableCell>
              <TableCell align="left">Date and Time</TableCell>
              <TableCell align="left">Repetitions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentData != undefined
              ? recentData.map((pose, idx) => (
                  <TableRow
                    key={pose.pose_name + idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {pose.pose_name}
                    </TableCell>
                    <TableCell align="left">{pose.level}</TableCell>
                    <TableCell align="left">{pose.time}</TableCell>
                    <TableCell align="left">
                      <span
                        className="status"
                        style={makeStyles(pose.repetition)}
                      >
                        {pose.repetition}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
