import React from "react";
import WebcamCapture from "../components/WebcamCapture/WebcamCapture";

export default function Scanner() {
  function handleCapture(file) {
    alert("Foto erstellt. Du kannst nun Fotos in UploadOptions kombinieren.");
  }

  return (
    <div style={{padding:20}}>
      <h2>Scanner</h2>
      <WebcamCapture onCapture={handleCapture} />
    </div>
  );
}