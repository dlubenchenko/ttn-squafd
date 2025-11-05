import { getFirestore, collection, getDocs } from "firebase/firestore";
import { type RawMenuValue } from "../types";

export async function fetchSidebarMenu(): Promise<RawMenuValue[]> {
  const db = getFirestore();
  const col = collection(db, "menu");
  const snapshot = await getDocs(col);
  
  return snapshot.docs.map(doc => doc.data() as RawMenuValue);
}