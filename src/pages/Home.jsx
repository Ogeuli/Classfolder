import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { getFolders, createFolder } from "../services/firestoreService";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("m3c_user") || "null");
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    if (!user) return navigate("/");
    (async () => {
      const f = await getFolders(user.code);
      setFolders(f);
    })();
  }, [navigate, user]);

  async function addFolder() {
    const name = prompt("Name des Ordners:");
    if (!name) return;
    await createFolder(user.code, name);
    const f = await getFolders(user.code);
    setFolders(f);
  }

  return (
    <div>
      <Navbar />
      <div style={{display:"flex"}}>
        <Sidebar folders={folders} onNewFolder={addFolder} />
        <main style={{padding:20, flex:1}}>
          <h1>{user?.code} — Willkommen {user?.name}</h1>
          <div style={{marginTop:20}}>
            <p>Klicke links einen Ordner an oder erstelle einen neuen.</p>
          </div>
        </main>
      </div>
    </div>
  );
}