"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid place-items-center mt-12">
      <Image src="hero-welcome.svg" alt="Imagem 'hero' da página de bem-vindo" width={260} height={260} />
      <h2 className="w-[80vw]">Create your own study plan</h2>
      <p className="w-[80vw]">Study according to the study plan, make study more motivated</p>

      <div className="flex gap-4">
        <Link href='/Signup'>Sign up</Link>

        <Link href='/Login'>Log in</Link>
      </div>
    </div>
  );
}
