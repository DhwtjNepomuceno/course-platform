"use client";

import { useAuth } from "@/context/AuthContext";

export default function Home() {

  const { user } = useAuth();
  
  return (
    <main className="flex h-screen flex-col bg-[#1E1D35]">
      <header className="bg-blue-500 px-8 pt-14 pb-10">
        <h1 className="text-4xl font-bold text-white">
          {user?.name}
        </h1>

        <p className="mt-2 text-lg text-blue-100">
          Let&apos;s start learning
        </p>
      </header>

      <section className="flex-1 bg-[#1E1D35]" />

      <footer className="h-20 border-t border-white/10 bg-[#23223E]">
        <nav className="flex h-full items-center justify-around text-sm text-gray-400">
          <button>Home</button>
          <button>Course</button>
          <button>Search</button>
          <button>Message</button>
          <button>Account</button>
        </nav>
      </footer>
    </main>
  );
}