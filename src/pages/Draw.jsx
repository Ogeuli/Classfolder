import React from "react";
import CanvasBoard from "../components/CanvasBoard/CanvasBoard";

export default function Draw() {
  return (
    <div style={{padding:20}}>
      <h2>Zeichnen</h2>
      <CanvasBoard />
    </div>
  );
}