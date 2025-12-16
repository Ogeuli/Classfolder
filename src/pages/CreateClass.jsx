import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClass, joinClass } from "../services/firestoreService";

export default function CreateClass() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
  e.preventDefault();

  if (!name.trim() || !code.trim()) {
    setError("Bitte Name und Klassencode eingeben.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    console.log("DEBUG: handleSubmit gestartet", { name, code });

    // 1) joinClass aufrufen
    console.log("DEBUG: vor joinClass");
    const exists = await joinClass(code, name);
    console.log("DEBUG: joinClass zurück:", exists);

    if (!exists) {
      console.log("DEBUG: Klasse existiert nicht, rufe createClass auf");
      await createClass(code);
      console.log("DEBUG: createClass erfolgreich");
      // User speichern
      localStorage.setItem("m3c_user", JSON.stringify({ name, code }));
      console.log("DEBUG: user in localStorage geschrieben");
    } else {
      console.log("DEBUG: Klasse existierte bereits – user gespeichert");
    }

    console.log("DEBUG: navigate /home");
    navigate("/home");
  } catch (err) {
    console.error("DEBUG: Fehler in handleSubmit:", err);
    setError("Fehler: " + (err?.message || String(err)));
  } finally {
    setLoading(false);
    console.log("DEBUG: handleSubmit fertig - loading false");
  }
}

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Willkommen</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Dein Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Klassencode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Bitte warten..." : "Starten"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#1f1f1f",
  },
  box: {
    background: "#2a2a2a",
    padding: 30,
    borderRadius: 12,
    width: "90%",
    maxWidth: 400,
    color: "white",
    textAlign: "center",
  },
  title: {
    marginBottom: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    border: "none",
    background: "#3b3b3b",
    color: "white",
  },
  button: {
    padding: 12,
    background: "#4e8cff",
    border: "none",
    color: "white",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
  },
  error: {
    color: "#ff6b6b",
    fontSize: 14,
  },
};