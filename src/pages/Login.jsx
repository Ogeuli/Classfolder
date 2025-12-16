// src/pages/Login.jsx (DEBUG / WORKING version)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  console.log("Login.jsx mounted");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    // show current location for debug
    console.log("Current path:", window.location.pathname);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Login (Debug)</h1>

      <div style={{ marginTop: 20 }}>
        <label>Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: "block", width: 300, marginTop: 8 }}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <label>Klassen-Code:</label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ display: "block", width: 300, marginTop: 8 }}
        />
      </div>

      <div style={{ marginTop: 30 }}>
        <button
          onClick={() => {
            console.log("DEBUG: join clicked");
            if (!name || !code) {
              alert("Bitte Name und Code eingeben");
              return;
            }
            localStorage.setItem("m3c_user", JSON.stringify({ name, code }));
            navigate("/home");
          }}
          style={{ marginRight: 10 }}
        >
          Test Anmelden
        </button>

        <button
          onClick={() => {
            console.log("DEBUG: create-class clicked");
            navigate("/create-class");
          }}
        >
          Debug: Neue Klasse erstellen (navigate)
        </button>
      </div>
    </div>
  );
}
