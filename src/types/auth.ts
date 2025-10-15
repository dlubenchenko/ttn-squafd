export type AuthContextType = {
    user: FirebaseUser | null;
    setUser: (user: FirebaseUser | null) => void;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    authLoading: boolean;
}

export interface FirebaseUser {
    uid: string;
    email: string | null;
    displayName: string | null;
}