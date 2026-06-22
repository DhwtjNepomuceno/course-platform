"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginFields } from "@/utils";
import { useRouter } from "next/navigation";
import { ApiResponseData, ApiResponseError } from "@/interfaces/api";
import { login, useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFields>()
  const router = useRouter();
  const t = useAuth().token
  useEffect(() => {
    if (t) router.replace("/Home")
  }, [router, t])

  async function handleSubmitFn(data: LoginFields) {
    try {
      const response = await fetch("/api/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      console.log(result)

      router.replace("../Home")
      login(result.data);

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="grid place-items-center mt-12">
      <h1 className="text-[32px]">Log In</h1>

      <div className=" min-w-screen min-h-screen bg-gray-700 rounded-2xl mt-3 justify-items-center">
        <form onSubmit={handleSubmit(handleSubmitFn)}>

          <div className="grid mt-2.5 w-81.5">
            <label htmlFor="email">Your E-mail</label>
            <input
              className={`bg-gray-600 w-81.5 h-12.5 rounded-lg pl-4 outline-none transition-all hover:bg-gray-500 hover:placeholder:text-gray-300
                ${errors.email && "outline outline-red-600"}`}
              id="email"
              type="email"
              placeholder="E-mail"
              autoComplete="email"
              {...register('email', { required: true })}
            />
            {errors.email && <span className="text-red-600 text-[12px] max-w-81.5">
              * You must enter your e-mail adress.</span>}
          </div>

          <div className="grid mt-2.5 w-81.5">
            <label htmlFor="password">Password</label>
            <input
              className={`bg-gray-600 w-81.5 h-12.5 rounded-lg pl-4 outline-none transition-all hover:bg-gray-500 hover:placeholder:text-gray-300
                ${errors.password && "outline outline-red-600"}`}
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="password"
              minLength={6}
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password?.type === "required" &&
              <span className="text-red-600 text-[12px] max-w-81.5">
                * You must enter your password.</span>}
            {errors.password?.type === "minLength" &&
              <span className="text-red-600 text-[12px] max-w-81.5">
                * Your password must be 6 characteres or more.</span>}
          </div>

          <div className="w-full text-right">
            <Link className="text-[14px] text-gray-400 hover:text-gray-300 hover:underline"
              href='/ForgotPassword'>Forgot your password?</Link>
          </div>

          <button
            className="bg-blue-600 w-81.5 h-12.5 rounded-lg mt-5 mb-1 hover:bg-blue-500"
            type="submit">Log in</button>

        </form>
        <div>

          <Link href='/Signup' className="text-[12px] mt-4">Doesn&apos;t have an account?
            <span className="text-blue-600 hover:underline hover:text-blue-500">Sign Up</span></Link>

        </div>

      </div>
    </div>
  )
}