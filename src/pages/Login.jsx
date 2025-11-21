import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateClassCode } from "../utils/generateClassCode";
import { createClass, classExists } from "../services/firestoreService";

export default function Login() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  async function handleJoin() {
    if (!name) return alert("Bitte Namen eingeben.");
    if (!code) return alert("Bitte Klassen-Code eingeben.");
    const exists = await classExists(code);
    if (!exists) return alert("Klasse nicht gefunden.");
    localStorage.setItem("m3c_user", JSON.stringify({ name, code }));
    navigate("/home");
  }

  async function handleCreate() {
    if (!name) return alert("Bitte Namen eingeben.");
    const newCode = generateClassCode();
    await createClass(newCode, ${name}'s Klasse, name);
    localStorage.setItem("m3c_user", JSON.stringify({ name, code: newCode }));
    alert("Neue Klasse erstellt: " + newCode + "\nTeile den Code mit Mitschülern.");
    navigate("/home");
  }

  return (
    <div className="page-login" style={{padding:24}}>
      <div className="login-card">
        <h1>Klassenspeicher</h1>
        <input placeholder="Dein Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Klassen-Code (wenn beitreten)" value={code} onChange={e=>setCode(e.target.value)} />
        <div style={{display:"flex", gap:8, marginTop:12}}>
          <button className="btn primary" onClick={handleJoin}>Beitreten</button>
          <button className="btn" onClick={handleCreate}>Neue Klasse</button>
        </div>
      </div>
    </div>
  );
}