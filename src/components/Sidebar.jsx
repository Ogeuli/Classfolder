import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ folders = [], onNewFolder }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Ordner</div>
      <div className="folders">
        {folders.map(f => (
          <Link key={f.id} to={/folder/${f.id}} className="folder-row">
            <div>{f.name}</div>
            <div className="muted">{new Date(f.createdAt?.seconds ? f.createdAt.seconds*1000 : Date.now()).toLocaleString()}</div>
          </Link>
        ))}
      </div>
      <div style={{padding:12}}>
        <button className="btn primary" onClick={onNewFolder}>Neuer Ordner</button>
      </div>
    </aside>
  );
}