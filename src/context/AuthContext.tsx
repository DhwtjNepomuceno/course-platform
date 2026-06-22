/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { createContext, useState, useContext, useEffect, ReactNode } from "react";

type AuthContextType = {
    token: string | null;
    setToken: (t: string | null) => void;
    setLoading: (t: boolean) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function login(token: string) {
    localStorage.setItem("token", token);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const t = localStorage.getItem("token");
        if (t) {
            setToken(t);
        }
    }, [])

    function logout() {
        localStorage.removeItem("token");
        setToken(null)
    }

    return <AuthContext.Provider value={{ token, setToken, logout, loading, setLoading }}> {children} </AuthContext.Provider>
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)


    if (!ctx) throw new Error("UseAuth must be used with AuthProvider.")
    return ctx
}