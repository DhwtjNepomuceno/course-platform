"use client"

import { DefaultFields } from "@/utils"
import Link from "next/link"
import { useForm } from "react-hook-form"

export default function ForgotPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm<DefaultFields>()

    async function handleSubmitFn(data: DefaultFields) {
        try {
            const response = await fetch("api/Auth/ForgotPassword", {
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
            <h1 className="text-[32px]">Forgot my password</h1>
            <p className="text-center text-gray-400 max-w-100">In order to reset your password, enter your e-mail and we&apos;ll send a code.</p>

            <div className="min-w-screen min-h-screen bg-gray-700 rounded-2xl mt-3 justify-items-center">
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
                    <Link href="/PasswordCode">
                        <button
                            className="bg-blue-600 w-81.5 h-12.5 rounded-lg mt-5 mb-1 hover:bg-blue-500"
                            type="submit">Next</button>
                    </Link>

                </form>
                <div>
                    <Link href='/Login' className="text-[12px] mt-4 hover:text-blue-300 hover:underline">Cancel</Link>
                </div>
            </div>

        </div >
    )
}