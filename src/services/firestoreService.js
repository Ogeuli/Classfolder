import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
  serverTimestamp
} from "firebase/firestore";
import { storage, db } from "./firebaseService";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/** Classes collection: key = classCode */
export async function createClass(code) {
  const ref = doc(db, "classes", code);
  await setDoc(ref, {
    code: code,
    createdAt: serverTimestamp()
  });
}

/** check if class exists */
export async function classExists(code) {
  const ref = doc(db, "classes", code);
  const snap = await getDoc(ref);
  return snap.exists();
}

/** Folders under class */
export async function createFolder(classCode, folderName) {
  const col = collection(db, "classes", classCode, "folders");
  return await addDoc(col, { name: folderName, createdAt: serverTimestamp() });
}

export async function getFolders(classCode) {
  const q = query(collection(db, "classes", classCode, "folders"), orderBy("createdAt", "desc"));
  const snaps = await getDocs(q);
  return snaps.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Files in folder */
export async function addFileDoc(classCode, folderId, meta) {
  const col = collection(db, "classes", classCode, "folders", folderId, "files");
  const docRef = await addDoc(col, { ...meta, createdAt: serverTimestamp() });
  return docRef;
}

export async function getFiles(classCode, folderId) {
  const q = query(collection(db, "classes", classCode, "folders", folderId, "files"), orderBy("createdAt", "desc"));
  const snaps = await getDocs(q);
  return snaps.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Single file doc by id: here we assume file doc id unique within folder */
export async function getFileDoc(classCode, folderId, fileId) {
  const d = doc(db, "classes", classCode, "folders", folderId, "files", fileId);
  const snap = await getDoc(d);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// ======================
// CLASS JOINING
// ======================
export async function joinClass(code, name) {
  const classRef = doc(db, "classes", code);
  const classSnap = await getDoc(classRef);

  if (!classSnap.exists()) {
    // Klasse existiert nicht → return false
    return false;
  }

  // Klasse existiert → Benutzer speichern
  localStorage.setItem("m3c_user", JSON.stringify({ name, code }));
  return true;
}

// ======================
// UPLOAD DRAWING
// ======================
export async function uploadDrawing(folderId, blob) {
  const filename = `drawing_${Date.now()}.png`;

  const storageRef = ref(storage, `uploads/${folderId}/${filename}`);

  await uploadBytes(storageRef, blob);

  const url = await getDownloadURL(storageRef);

  // Datei in Firestore eintragen
  const filesRef = collection(db, "folders", folderId, "files");

  await addDoc(filesRef, {
    name: filename,
    type: "drawing",
    url,
    createdAt: Date.now()
  });

  return url;
}