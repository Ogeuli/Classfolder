import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import FileUploader from "../components/FileUploader";
import WebcamCapture from "../components/WebcamCapture/WebcamCapture";

export default function UploadOptions() {
  const { folderId } = useParams();
  const user = JSON.parse(localStorage.getItem("m3c_user") || "null");
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div style={{padding:20}}>
      <h2>Datei hinzufügen</h2>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
        <div style={{background:"#2a2a2a", padding:12, borderRadius:8}}>
          <h3>Hochladen</h3>
          <FileUploader classCode={user.code} folderId={folderId} onDone={()=>{navigate(-1);}} />
        </div>

        <div style={{background:"#2a2a2a", padding:12, borderRadius:8}}>
          <h3>Cam → PDF</h3>
          <WebcamCapture onCapture={(file)=> {
            // redirect to a simple upload flow - we reuse FileUploader logic or storageService directly in production
            alert("Foto aufgenommen. Wechsle zu Ordner-Upload, um es zu speichern.");
          }} />
        </div>
      </div>
    </div>
  );
}