import { useFirebaseIdToken } from "../hooks";
import { fetchWithRetry } from "../utils/fetchWithRetry";

export async function fetchSheetData(sheet: string = "schedule", url: string) {
  const token = await useFirebaseIdToken();
  const link = `${url}?sheet=${sheet}&token=${token}`;

  // console.log(link);

  const res = await fetchWithRetry(link, undefined, 2, 1000);
  const json = await res.json();

  // console.log(json);
  // console.log(link);

  if (json.result !== "success") {

    throw new Error(json.message || "Не вдалося завантажити дані");
  }

  return json.data;
}