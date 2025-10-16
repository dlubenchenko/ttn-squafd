import { createContext, useEffect, useState } from "react"

import type { FirebaseUser, ContextProviderProps, AuthContextType } from "../types";

import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";


export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: ContextProviderProps) => {

    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    role: 'guest',
                    division: undefined
                });
            } else {
                setUser(null)
            }
            setAuthLoading(false)
        });
        return () => unsubscribe();
    }, []);


    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // userCredential.user — це користувач з Firebase
            setUser({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
                role: 'guest',
                division: undefined
            });
        } catch (error: unknown) {
            throw error;
        }
    }

    const logout = () => {
        setUser(null);
        auth.signOut()
    }

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, authLoading }}>
            {children}
        </AuthContext.Provider>
    )
}