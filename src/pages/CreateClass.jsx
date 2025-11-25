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
      const classExists = await joinClass(code, name);

      if (!classExists) {
        // Wenn Klasse nicht existiert → erstelle neue
        await createClass(code);
      }

      // User lokal speichern
      localStorage.setItem(
        "m3c_user",
        JSON.stringify({ name, code })
      );

      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Fehler: " + err.message);
    } finally {
      setLoading(false);
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