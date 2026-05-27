"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { SignupFields } from "../../utils";

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFields>();

    async function handleSubmitFn(data: SignupFields) {
        try {
            const response = await fetch("/api/Auth/Signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            console.log(result)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="grid place-items-center mt-12">
            <h1 className="text-[32px]">Sign Up</h1>
            <p className="text-center text-gray-400">Enter your details below & free sign up</p>

            <div className=" min-w-screen min-h-screen bg-gray-700 rounded-2xl mt-3 justify-items-center">
                <form onSubmit={handleSubmit(handleSubmitFn)}>

                    <div className="grid mt-2.5 w-81.5">
                        <label htmlFor="name">Name</label>
                        <input
                            className={`bg-gray-600 w-81.5 h-12.5 rounded-lg pl-4 outline-none transition-all hover:bg-gray-500 hover:placeholder:text-gray-300
                                ${errors.name && "outline outline-red-600"}`}
                            id="name"
                            type="text"
                            placeholder="Full name"
                            autoComplete="name"
                            minLength={6}
                            {...register('name', { required: true })}
                        />
                        {errors.name && <span className="text-red-600 text-[12px] max-w-81.5">
                            * You must enter your full name.</span>}
                    </div>

                    <div className="grid mt-2.5 w-81.5">
                        <label htmlFor="birthday">Birthday</label>
                        <input
                            className={`bg-gray-600 w-81.5 h-12.5 rounded-lg pl-4 pr-4 outline-none transition-all text-gray-400 hover:bg-gray-500 hover:text-gray-300
                                ${errors.birthday && "outline outline-red-600"}`}
                            id="birthday"
                            type="date"
                            autoComplete="bday-day"
                            {...register('birthday', { required: true })}
                        />
                        {errors.birthday && <span className="text-red-600 text-[12px] max-w-81.5">
                            * You must enter your birthday.</span>}
                    </div>

                    <div className="grid mt-2.5 w-81.5">
                        <label htmlFor="email">E-mail</label>
                        <input
                            className={`bg-gray-600 w-81.5 h-12.5 rounded-lg pl-4 outline-none transition-all hover:bg-gray-500 hover:placeholder:text-gray-300
                                ${errors.email && "outline outline-red-600"}`}
                            id="email"
                            type="email"
                            placeholder="E-mail"
                            autoComplete="email"
                            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
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
                                * You must enter your password.</span>
                        }
                        {errors.password?.type === "minLength" &&
                            <span className="text-red-600 text-[12px] max-w-81.5">
                                Your password must be 6 characteres or more.</span>
                        }
                    </div>

                    <button
                        className="bg-blue-600 w-81.5 h-12.5 rounded-lg mt-5 mb-5 hover:bg-blue-500"
                        type="submit">Create Account</button>

                    <div className="flex items-start gap-2">
                        <input
                            id="is-accepted"
                            type="checkbox"
                            className="mt-1 accent-blue-500 cursor-pointer"
                            {...register('isAccepted', { required: true })}
                        />
                        <div className="grid gap-1">
                            <label
                                className="text-[12px] max-w-81.5 leading-tight hover:underline"
                                htmlFor="is-accepted">
                                By creating an account you have to agree with our terms & conditions.
                            </label>
                            {errors.isAccepted &&
                                <span className="text-red-600 text-[12px]">
                                    * You must accept the terms before signing up.</span>}
                        </div>
                    </div>



                </form>

                <div>
                    <Link href='/Login' className="text-[12px] mt-4">Already have an account? <Link
                        className="text-blue-500 hover:text-blue-400 hover:underline"
                        href='/Login'>Log in</Link>
                    </Link>
                </div>
            </div>
        </div>
    );
}