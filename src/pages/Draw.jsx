import React, { useRef } from "react";
import CanvasDraw from "canvas-draw";
import { useParams, useNavigate } from "react-router-dom";
import { uploadDrawing } from "../services/storageService";

export default function Draw() {
  const { folderId } = useParams();
  const navigate = useNavigate();

  const canvasRef = useRef();

  async function handleSave() {
    const drawingData = canvasRef.current.getDataURL("png");

    const file = await fetch(drawingData)
      .then((res) => res.blob())
      .then((blob) => new File([blob],`drawing_${Date.now()}`.png, { type: "image/png" }));

    await uploadDrawing(folderId, file);

    alert("Zeichnung gespeichert!");
    navigate(`/folder/${folderId}`);
  }

  return (
    <div style={styles.container}>
      <div style={styles.toolbar}>
        <button onClick={() => canvasRef.current.undo()} style={styles.btn}>
          Rückgängig
        </button>

        <button onClick={() => canvasRef.current.clear()} style={styles.btn}>
          Löschen
        </button>

        <button onClick={handleSave} style={styles.btnSave}>
          Speichern
        </button>

        <button onClick={() => navigate(-1)} style={styles.btnBack}>
          Zurück
        </button>
      </div>

      <CanvasDraw
        ref={canvasRef}
        brushColor="white"
        brushRadius={3}
        lazyRadius={1}
        canvasWidth={window.innerWidth - 40}
        canvasHeight={window.innerHeight - 120}
        hideGrid={true}
        style={styles.canvas}
      />
    </div>
  );
}

const styles = {
  container: {
    background: "#1e1e1e",
    height: "100vh",
    padding: 20,
    color: "white",
  },
  toolbar: {
    display: "flex",
    gap: 10,
    marginBottom: 10,
  },
  btn: {
    background: "#444",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: 6,
    cursor: "pointer",
  },
  btnSave: {
    background: "#4e8cff",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: 6,
    cursor: "pointer",
  },
  btnBack: {
    background: "#777",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: 6,
    marginLeft: "auto",
    cursor: "pointer",
  },
  canvas: {
    borderRadius: 12,
    boxShadow: "0 0 10px rgba(0,0,0,0.6)",
  },
};