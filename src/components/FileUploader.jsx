import React, { useRef, useState } from "react";
import { uploadFileToPath, imagesToPdfBlob, uploadBlobToPath } from "../services/storageService";
import { addFileDoc } from "../services/firestoreService";

export default function FileUploader({ classCode, folderId, onDone }) {
  const fileInput = useRef();
  const imageBatch = useRef([]);
  const [status, setStatus] = useState("");

  async function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setStatus("Upload...");
    const path = classes/${classCode}/${folderId}/${Date.now()}_${f.name};
    const url = await uploadFileToPath(path, f);
    await addFileDoc(classCode, folderId, { name: f.name, url, type: f.type, storageName: ${Date.now()}_${f.name} });
    setStatus("Fertig");
    fileInput.current.value = "";
    onDone && onDone();
  }

  function addImageToBatch(e) {
    const f = e.target.files[0];
    if (!f) return;
    imageBatch.current.push(f);
  }

  async function createPdfFromImages() {
    if (imageBatch.current.length === 0) return alert("Keine Bilder ausgewählt");
    setStatus("Erzeuge PDF...");
    const blob = await imagesToPdfBlob(imageBatch.current);
    const filename = photos_${Date.now()}.pdf;
    const path = classes/${classCode}/${folderId}/${Date.now()}_${filename};
    const url = await uploadBlobToPath(path, blob);
    await addFileDoc(classCode, folderId, { name: filename, url, type: "application/pdf", storageName: ${Date.now()}_${filename} });
    imageBatch.current = [];
    setStatus("Fertig");
    onDone && onDone();
  }

  return (
    <div>
      <div style={{display: "flex", gap: 8}}>
        <input ref={fileInput} type="file" onChange={handleFile} />
        <div>
          <input type="file" accept="image/*" onChange={addImageToBatch} />
          <button className="btn" onClick={createPdfFromImages}>Fotos → PDF</button>
        </div>
      </div>
      <div className="small">{status}</div>
    </div>
  );
}