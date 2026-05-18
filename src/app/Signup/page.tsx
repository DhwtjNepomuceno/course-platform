"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { SignupFieldsUI } from "../../utils";

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFieldsUI>();

    async function handleSubmitFn(data: SignupFieldsUI) {
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
            <p>Enter your details below & free sign up</p>

            <div className=" min-w-screen min-h-screen bg-gray-700 rounded-2xl mt-3 justify-items-center">
                <form onSubmit={handleSubmit(handleSubmitFn)}>

                    <div className="grid mt-2.5 w-81.5">
                        <label htmlFor="name">Full name</label>
                        <input
                            className={`bg-gray-600 w-81.5 h-12.5 rounded-[8] pl-2
                                ${errors.name && "outline outline-red-600"}`}
                            id="name"
                            type="text"
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
                            className={`bg-gray-600 w-81.5 h-12.5 rounded-[8] pl-2
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
                            className={`bg-gray-600 w-81.5 h-12.5 rounded-[8] pl-2
                                ${errors.email && "outline outline-red-600"}`}
                            id="email"
                            type="email"
                            autoComplete="email"
                            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                        />
                        {errors.email && <span className="text-red-600 text-[12px] max-w-81.5">
                            * You must enter your e-mail adress.</span>}
                    </div>

                    <div className="grid mt-2.5 w-81.5">
                        <label htmlFor="password">Password</label>
                        <input
                            className={`bg-gray-600 w-81.5 h-12.5 rounded-[8] pl-2
                                ${errors.password && "outline outline-red-600"}`}
                            id="password"
                            type="password"
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
                        className="bg-blue-600 w-81.5 h-12.5 rounded-xl mt-5 mb-5 hover:bg-blue-500"
                        type="submit">Create Account</button>

                    <div className="flex items-start">
                        <input
                            id="is-accepted"
                            type="checkbox"
                            className="mt-1"
                            {...register('isAccepted', { required: true })}
                        />
                        <div className="grid gap-1">
                            <label
                                className={"text-[12px] max-w-81.5 leading-tight"}
                                htmlFor="is-accepted">
                                By creating an account you have to agree with our terms & conditions.
                            </label>
                            {errors.isAccepted &&
                                <span className="text-red-600 text-[12px]">
                                    * Você deve aceitar os termos antes de se cadastrar.</span>}
                        </div>
                    </div>



                </form>

                <div>
                    <p className="text-[12px] mt-4">Already have an account? <Link
                        className="text-blue-500 hover:text-blue-400 hover:underline"
                        href='/Login'>Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}