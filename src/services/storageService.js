import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "./firebaseService";
import { PDFDocument } from "pdf-lib";

/** Upload a File/Blob to given storage path and return public URL */
export async function uploadBlobToPath(path, blob) {
  const r = ref(storage, path);
  const snap = await uploadBytes(r, blob);
  return await getDownloadURL(snap.ref);
}

/** Upload File (from input) */
export async function uploadFileToPath(path, file) {
  return await uploadBlobToPath(path, file);
}

/** Convert array of image Files/Blobs to single PDF Blob using pdf-lib */
export async function imagesToPdfBlob(imageFiles) {
  const pdfDoc = await PDFDocument.create();
  for (const file of imageFiles) {
    const arrayBuf = await file.arrayBuffer();
    let img;
    if (file.type.includes("png")) img = await pdfDoc.embedPng(arrayBuf);
    else img = await pdfDoc.embedJpg(arrayBuf);
    const page = pdfDoc.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
  }
  const bytes = await pdfDoc.save();
  return new Blob([bytes], { type: "application/pdf" });
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