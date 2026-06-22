'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token, loading } = useAuth();

  useEffect(() => {
    if (!loading && !token) {
      router.replace('/Login');
    }
  }, [loading, token, router]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
}