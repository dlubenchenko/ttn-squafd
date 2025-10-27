import { createContext, useContext, useEffect, useState } from "react"

import type { FirebaseUser, ContextProviderProps, AuthContextType, MenuContextValueType } from "../types";

import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { fetchUserByEmail } from "../api/userApi";

import { loadMenu } from "../helpers";

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: ContextProviderProps) => {

    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    const [menu, setMenu] = useState<MenuContextValueType[] | null>(null);
    const [_menuLoading, setMenuLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            const handleUser = async () => {
                if (firebaseUser) {
                    const sheetUserInfo = await fetchUserByEmail(firebaseUser.email);
                    const userMenu = {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: sheetUserInfo?.displayName || null,
                        role: sheetUserInfo?.role || 'guest',
                        division: sheetUserInfo?.division,
                    }
                    setUser(userMenu);

                    if (sheetUserInfo?.role && sheetUserInfo?.division) {
                        await loadMenu({
                            role: sheetUserInfo?.role,
                            division: sheetUserInfo?.division,
                            setMenu,
                            setMenuLoading,
                        });
                    }
                } else {
                    setUser(null);
                    setMenu(null);
                }
                setAuthLoading(false);
            };
            handleUser();
        });
        return () => unsubscribe();
    }, []);


    const login = async (email: string, password: string) => {
        setAuthLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const sheetUserInfo = await fetchUserByEmail(email);
            const userMenu = {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: sheetUserInfo?.displayName || null,
                role: sheetUserInfo?.role || 'guest',
                division: sheetUserInfo?.division,
            }
            setUser(userMenu);
            if (sheetUserInfo?.role && sheetUserInfo?.division) {
                await loadMenu({
                    role: sheetUserInfo?.role,
                    division: sheetUserInfo?.division,
                    setMenu,
                    setMenuLoading,
                });
            }
        } catch (error: unknown) {
            setAuthLoading(false)
            throw error;
        }
    }

    const logout = () => {
        setAuthLoading(true)
        setUser(null);
        setMenu(null);
        auth.signOut()
    }

    return (
        <AuthContext.Provider value={{
            user, setUser, login, logout, authLoading, menu, setMenu, loadMenu: (props) => loadMenu({ ...props, setMenu, setMenuLoading })
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext);
}
