/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { AuthUser } from "@/interfaces/user";

type AuthContextType = {
    token: string | null;
    user: AuthUser | null;
    setToken: (t: string | null) => void;
    setUser: (u: AuthUser | null) => void;
    setLoading: (t: boolean) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Persiste token e usuário no localStorage após um login/signup bem-sucedido.
 */
export function login(token: string, user: AuthUser) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
}

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const t = localStorage.getItem("token");
        if (t) {
            setToken(t);
        }

        const u = localStorage.getItem("user");
        if (u) {
            try {
                setUser(JSON.parse(u) as AuthUser);
            } catch {
                localStorage.removeItem("user");
            }
        }

        setLoading(false);
    }, [])

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ token, user, setToken, setUser, logout, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)


    if (!ctx) throw new Error("UseAuth must be used with AuthProvider.")
    return ctx
}
