import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import CreateClass from "../pages/CreateClass";
import Home from "../pages/Home";
import Folderview from "../pages/Folderview";
import View from "../pages/View";
import UploadOptions from "../pages/UploadOptions";
import Notes from "../pages/Notes";
import Draw from "../pages/Draw";
import Scanner from "../pages/Scanner";
import FileViewPage from "../pages/FileView";
import WebcamPage from "../pages/Webcampage";

function requireAuth() {
  const user = localStorage.getItem("m3c_user");
  return !!user;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/create-class" element={<CreateClass />} />
      <Route
        path="/home"
        element={requireAuth() ? <Home /> : <Navigate to="/" />}
      />
      <Route
        path="/folder/:folderId"
        element={requireAuth() ? <Folderview /> : <Navigate to="/" />}
      />
      <Route
        path="/view/:id"
        element={requireAuth() ? <View /> : <Navigate to="/" />}
      />
      <Route
        path="/file/:id"
        element={requireAuth() ? <FileViewPage /> : <Navigate to="/" />}
      />
      <Route
        path="/upload/:folderId"
        element={requireAuth() ? <UploadOptions /> : <Navigate to="/" />}
      />
      <Route
        path="/notes/:folderId/:noteId?"
        element={requireAuth() ? <Notes /> : <Navigate to="/" />}
      />
      <Route
        path="/draw/:folderId"
        element={requireAuth() ? <Draw /> : <Navigate to="/" />}
      />
      <Route
        path="/scanner/:folderId"
        element={requireAuth() ? <Scanner /> : <Navigate to="/" />}
      />
      <Route
        path="/webcam/:folderId"
        element={requireAuth() ? <WebcamPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
}