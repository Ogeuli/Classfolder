import React from "react";

export default function FileView({ fileUrl, fileType, uploadedAt }) {
  if (!fileUrl) return <div>Keine Datei-URL</div>;
  const wrapper = { background: "#2b2b2b", padding: 16, borderRadius: 8 };

  if (fileType === "application/pdf" || fileUrl.endsWith(".pdf")) {
    return (
      <div style={wrapper}>
        <embed src={fileUrl} type="application/pdf" width="100%" height="700px" />
      </div>
    );
  }

  if (fileType && fileType.startsWith("image/")) {
    return (
      <div style={wrapper}>
        <img src={fileUrl} alt="Bild" style={{ width: "100%", borderRadius: 6 }} />
      </div>
    );
  }

  if (fileType && fileType.startsWith("video/")) {
    return (
      <div style={wrapper}>
        <video src={fileUrl} controls style={{ width: "100%" }} />
      </div>
    );
  }

  if (fileType && fileType.startsWith("audio/")) {
    return (
      <div style={wrapper}>
        <audio controls src={fileUrl} style={{ width: "100%" }} />
      </div>
    );
  }

  // fallback: download
  return (
    <div style={wrapper}>
      <a href={fileUrl} download className="btn">Datei herunterladen</a>
    </div>
  );
}