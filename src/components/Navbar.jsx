import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("m3c_user") || "null");

  function logout() {
    localStorage.removeItem("m3c_user");
    navigate("/");
  }

  return (
    <header className="topbar">
      <div className="brand">
        <Link to="/home" style={{ color: "var(--accent)", textDecoration: "none" }}>
          KlassenApp
        </Link>
      </div>

      <div className="nav-actions">
        <div className="user-info">{user?.name || "Gast"}</div>
        <button className="btn small" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}