import { useFirebaseIdToken } from "../hooks";

export async function fetchSheetData(sheet: string = "schedule", url: string) {
  const token = await useFirebaseIdToken();
  const link = `${url}?sheet=${sheet}&token=${token}`;

  // console.log(link);

  const res = await fetch(link);
  const json = await res.json();

  // console.log(json);
  // console.log(link);

  if (json.result !== "success") {

    throw new Error(json.message || "Не вдалося завантажити дані");
  }

  return json.data;
}