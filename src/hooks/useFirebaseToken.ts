import { getAuth } from "firebase/auth";

export async function useFirebaseIdToken() {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) return null;
  
  return await user.getIdToken();
}