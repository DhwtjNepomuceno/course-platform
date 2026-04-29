"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";

type LoginFields = {
  email: string,
  password: string
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFields>()

  function handleSubmitFn(data: LoginFields): void {
    console.log(data)
  }

  return (
    <div className="grid place-items-center mt-12">
      <h1 className="text-[32px]">Log In</h1>

      <div className=" min-w-screen min-h-screen bg-gray-700 rounded-2xl mt-3 justify-items-center">
        <form onSubmit={handleSubmit(handleSubmitFn)}>

          <div className="grid mt-2.5 w-81.5">
            <label htmlFor="email">Your E-mail</label>
            <input
              className={`bg-gray-600 w-81.5 h-12.5 rounded-[8] 
                ${errors.email && "outline outline-red-600"}`}
              id="email"
              type="email"
              {...register('email', { required: true })}
            />
            {errors.email && <span className="text-red-600 text-[12px] max-w-81.5">
              * You must enter your e-mail adress.</span>}
          </div>

          <div className="grid mt-2.5 w-81.5">
            <label htmlFor="password">Password</label>
            <input
              className={`bg-gray-600 w-81.5 h-12.5 rounded-[8]
                ${errors.password && "outline outline-red-600"}`}
              id="password"
              type="password"
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
            <Link className="text-[14px] text-gray-300" href='/ForgotPassword'>Forgot your password?</Link>
          </div>

          <button
            className="bg-blue-600 w-81.5 h-12.5 rounded-xl mt-5 mb-5 hover:bg-blue-500"
            type="submit">Log in</button>

        </form>
        <div>

          <p className="text-[12px] mt-4">Doesn&apos;t have an account? <Link
            className="text-blue-500 hover:text-blue-400 hover:underline"
            href='/Signup'>Sign Up</Link>
          </p>

        </div>

      </div>
    </div>
  )
}