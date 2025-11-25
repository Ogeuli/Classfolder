import React, { useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

export default function CanvasBoard({ initialData, onSave }) {
  const ref = useRef(null);

  async function save() {
    const data = await ref.current.exportImage("png");
    // data is a base64 string - convert to blob and send to storage if needed
    onSave && onSave(data);
  }

  return (
    <div>
      <ReactSketchCanvas
        ref={ref}
        style={{ border: "1px solid rgba(255,255,255,0.05)", background: "#0f0f0f" }}
        strokeWidth={4}
        strokeColor="#ffffff"
        width="100%"
        height="400px"
      />
      <div style={{marginTop:8}}>
        <button className="btn" onClick={save}>Speichern</button>
      </div>
    </div>
  );
}