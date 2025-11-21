// verbindet app aus deiner Firebase-config mit firestore & storage
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { app } from "../Firebase/Firebase-config";

export const db = getFirestore(app);
export const storage = getStorage(app);