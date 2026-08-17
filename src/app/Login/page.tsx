"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginForm } from "@/utils";
import { useRouter } from "next/navigation";
import { login, useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { ApiResponseData, ApiResponseError } from "@/interfaces/api";
import { AuthPayload } from "@/interfaces/user";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token, setToken, setUser } = useAuth();
  useEffect(() => {
    if (token) router.replace("/Home")
  }, [router, token])

  async function handleSubmitFn(data: LoginForm) {
    try {
      setLoading(true);

      const response = await fetch("/api/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const result: ApiResponseData<AuthPayload> | ApiResponseError = await response.json()

      if (!result.successed || !("data" in result)) {
        throw new Error("error" in result ? result.error : "Unexpected error, try again later.");
      }

      const { token, user } = result.data;

      login(token, user);
      setToken(token);
      setUser(user);
      router.replace("/Home")

    } catch (error) {
      alert(error)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid place-items-center mt-[44px]">
      <h1 className="text-title-t">Login</h1>
      <p className="text-center text-subtitle-c text-subtitle-t">Insert your email and password to log in.</p>

      <div className="min-w-screen min-h-screen mt-[44px] bg-surface-c rounded-2xl justify-items-center">
        <form onSubmit={handleSubmit(handleSubmitFn)}>

          <div className="grid mt-2.5 w-86">
            <label className="text-label-c ml-1" htmlFor="email">Your E-mail</label>
            <input
              className={`bg-input-c w-86 h-12.5 rounded-2xl pl-4 outline-none transition-all hover:bg-input-hover-c hover:placeholder:text-placeholder-hover-c
                ${errors.email && "outline outline-red-600"}`}
              id="email"
              type="email"
              placeholder="E-mail"
              autoComplete="email"
              {...register('email', { required: true })}
            />
            {errors.email && <span className="text-red-600 text-error-t max-w-81.5">
              * You must enter your e-mail adress.</span>}
          </div>

          <div className="grid mt-2.5 w-86">
            <label className="text-label-c text-label-t ml-1" htmlFor="password">Password</label>
            <input
              className={`bg-input-c w-86 h-12.5 rounded-2xl pl-4 outline-none transition-all hover:bg-input-hover-c hover:placeholder:text-placeholder-hover-c
                ${errors.password && "outline outline-red-600"}`}
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="password"
              minLength={6}
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password?.type === "required" &&
              <span className="text-red-600 text-error-t max-w-81.5">
                * You must enter your password.</span>}
            {errors.password?.type === "minLength" &&
              <span className="text-red-600 text-error-t max-w-81.5">
                * Your password must be 6 characteres or more.</span>}
          </div>

          <div className="w-full text-right">
            <Link className="text-[14px] text-label-c hover:text-[#aeaec0] hover:underline"
              href='/ForgotPassword'>Forgot your password?</Link>
          </div>

          <button
            className="bg-button-c w-86 h-12.5 rounded-xl mt-5 mb-1 hover:bg-button-hover-c"
            type="submit" disabled={loading}>Log in</button>

        </form>

        <div>
          <Link href='/Signup' className="text-[14px] text-gray-400 mt-4">Doesn&apos;t have an account?
            <span className="text-[#5d76f7] hover:underline hover:text-[#9aa7e9]"> Sign Up</span></Link>
        </div>

      </div>
    </div>
  )
}
