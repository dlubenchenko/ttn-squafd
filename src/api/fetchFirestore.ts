import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import type { ConfigType } from "../types";

export async function getDataFromFirestore(collectionName: string, docId: string = ''): Promise<ConfigType | null> {
  const db = getFirestore();

  if (docId) {
    const configRef = doc(db, collectionName, docId);
    const configSnap = await getDoc(configRef);
    if (configSnap.exists()) {
      return configSnap.data() as ConfigType;
    }
    return null;
  } else {
    const colRef = collection(db, collectionName);
    const colSnap = await getDocs(colRef);
    return colSnap.docs.map(doc => doc.data()) as unknown as ConfigType;
  }
}