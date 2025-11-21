import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseService";
import FileView from "../components/FileView";

export default function View() {
  const { id } = useParams();
  const [docData, setDocData] = useState(null);
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // Here we assume a global collection 'files' for quick preview (you may want class/folder structure)
        const ref = doc(db, "files", id);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          setDocData(null);
          setLoading(false);
          return;
        }
        const data = snap.data();
        setDocData(data);
        setUrl(data.url);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div style={{padding:20}}>Lädt …</div>;
  if (!docData) return <div style={{padding:20}}>Datei nicht gefunden.</div>;

  return (
    <div style={{padding:20}}>
      <h2>{docData.name || "Datei"}</h2>
      <FileView fileUrl={url} fileType={docData.type || "application/pdf"} uploadedAt={docData.createdAt} />
    </div>
  );
}