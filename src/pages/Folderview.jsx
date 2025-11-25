import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { getFiles, getFolders } from "../services/firestoreService";
import FileUploader from "../components/FileUploader";
import {createFolder} from "../services/firestoreService";

export default function Folderview() {
  const { folderId } = useParams();
  const user = JSON.parse(localStorage.getItem("m3c_user") || "null");
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    if (!user) return navigate("/");
    (async () => {
      const f = await getFolders(user.code);
      setFolders(f);
      const fl = await getFiles(user.code, folderId);
      setFiles(fl);
    })();
  }, [folderId, navigate, user]);

  return (
    <div>
      <Navbar />
      <div style={{display:"flex"}}>
        <Sidebar folders={folders} onNewFolder={async ()=>{
          const name = prompt("Name des Ordners");
          if (!name) return;
          await createFolder(user.code, name);
          const f = await getFolders(user.code);
          setFolders(f);
        }} />
        <main style={{padding:20, flex:1}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <h2>Ordner</h2>
            <FileUploader classCode={user.code} folderId={folderId} onDone={async ()=>{
              const fl = await getFiles(user.code, folderId);
              setFiles(fl);
            }} />
          </div>

          <section style={{marginTop:20}}>
            {files.map(file => (
              <div key={file.id} style={{display:"flex", justifyContent:"space-between", padding:10, marginBottom:8, background:"#2b2b2b", borderRadius:8}}>
                <div>
                  <div style={{fontWeight:600}}>{file.name}</div>
                  <div style={{fontSize:12, color:"#a0a0a0"}}>{new Date(file.createdAt?.seconds ? file.createdAt.seconds*1000 : Date.now()).toLocaleString()}</div>
                </div>
                <div>
                  <a href={file.url} target="_blank" rel="noreferrer"><button className="btn">Öffnen</button></a>
                </div>
              </div>
            ))}
            {files.length===0 && <div className="empty">Keine Dateien</div>}
          </section>
        </main>
      </div>
    </div>
  );
}