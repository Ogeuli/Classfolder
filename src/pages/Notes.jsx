import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CanvasBoard from "../components/CanvasBoard/CanvasBoard";
import { uploadBlobToPath } from "../services/storageService";
import { addFileDoc } from "../services/firestoreService";

export default function Notes() {
  const { folderId } = useParams();
  const user = JSON.parse(localStorage.getItem("m3c_user") || "null");
  const [saving, setSaving] = useState(false);

  async function handleSave(base64png) {
    setSaving(true);
    // base64 -> blob
    const res = await fetch(base64png);
    const blob = await res.blob();
    const filename = note_${Date.now()}.png;
    const path = classes/${user.code}/${folderId}/${Date.now()}_${filename};
    const url = await uploadBlobToPath(path, blob);
    await addFileDoc(user.code, folderId, { name: filename, url, type: "image/png", storageName: ${Date.now()}_${filename} });
    setSaving(false);
    alert("Notiz gespeichert.");
  }

  return (
    <div style={{padding:20}}>
      <h2>Notiz Editor</h2>
      <CanvasBoard onSave={handleSave} />
      {saving && <div>Speichern...</div>}
    </div>
  );
}