"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid place-items-center mt-12 text-center">
      <Image src="hero-welcome.svg" alt="Imagem 'hero' da página de bem-vindo" loading="eager" width={260} height={260} />
      <h2 className="w-[80vw] text-[22px] font-bold max-w-48">Create your own study plan</h2>
      <p className="w-[80vw] text-[16px] max-w-47.5 mt-6">Study according to the study plan, make study more motivated</p>

      <div className="flex gap-4 content-end-safe mt-25">
        <Link className="bg-blue-600 pr-13 pl-13 pt-3 pb-3 rounded-xl hover:bg-blue-500"
          href='/Signup'>Sign up</Link>

        <Link className="bg-gray-500 pr-13 pl-13 pt-3 pb-3 rounded-xl hover:bg-gray-400"
          href='/Login'>Log in</Link>
      </div>
    </div>
  );
}
