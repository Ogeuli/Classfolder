import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function WebcamCapture({ onCapture }) {
  const camRef = useRef(null);
  const [facingMode, setFacingMode] = useState("environment");

  const videoConstraints = { facingMode };

  function capture() {
    const dataUrl = camRef.current.getScreenshot();
    // convert dataUrl to blob
    fetch(dataUrl)
      .then(res => res.blob())
      .then(blob => onCapture && onCapture(new File([blob], `cam_${Date.now()}.jpg`, { type: "image/jpeg" })));
  }

  return (
    <div>
      <Webcam audio={false} ref={camRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} />
      <div style={{marginTop:8, display:"flex", gap:8}}>
        <button className="btn" onClick={() => setFacingMode(f => f === "user" ? "environment" : "user")}>Kamera wechseln</button>
        <button className="btn primary" onClick={capture}>Foto machen</button>
      </div>
    </div>
  );
}