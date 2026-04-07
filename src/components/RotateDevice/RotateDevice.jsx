import React from "react";
import "./RotateDevice.css";
import rotate from "../../assets/rotate.png";


export default function RotateDevice() {
  return (
    <div className="RotateDevice">
      <div className="roatate_device_img_container">
        <center>
          <img src={rotate} alt="" />
          <p>Please rotate your device and <strong onClick={() => {window.location.reload(false);}}>refresh</strong></p>
        </center>
      </div>
 
    </div>
  );
}
