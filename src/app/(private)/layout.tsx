"use client"

import { ProtectedRoute } from "@/components/ProtectedRoutes"

export default function PrivateLayout({children}: {children: React.ReactNode}) {
    return <ProtectedRoute>{children}</ProtectedRoute>
    
}