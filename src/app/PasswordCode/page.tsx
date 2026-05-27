"use client"

import { DefaultFields } from "@/utils"
import Link from "next/link"
import { useForm } from "react-hook-form"

export default function ForgotPassword() {
    const { handleSubmit, formState: { errors } } = useForm<DefaultFields>()

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

    <div className="min-h-screen bg-gray-700 rounded-2xl flex flex-col items-center pt-12">

        <form
            onSubmit={handleSubmit(handleSubmitFn)}
            className="flex flex-col items-center">
            <h1 className="text-[32px] mb-4">
                Forgot my password
            </h1>

            <p className="text-center text-gray-400">
                Enter the code sent in your e-mail.
            </p>

            <p className="text-center text-gray-400 mb-6">
                Do not forward your code to anyone.
            </p>

            <div className="flex gap-3 mb-4">

                {[...Array(6)].map((_, i) => (
                <input
                key={i}
                type="text"
                maxLength={1}
                autoComplete="none"
                className="w-12 h-12 bg-gray-600 rounded-xl text-center text-xl outline-none hover:bg-gray-500 focus:ring-2 focus:ring-blue-500 transition-all"/>
                ))}

            </div>
                {errors.code && (
                <span className="text-red-600 text-[12px] mb-2">
                    * You must enter the correct code.
                </span>
                )}

                <button
                    className="bg-blue-600 w-81.5 h-12.5 rounded-lg mt-3 hover:bg-blue-500 transition-all"
                    type="submit">
                    Next
                </button>

                <Link
                    href="/Login"
                    className="text-[12px] mt-4 hover:text-blue-300 hover:underline">
                    Cancel
                </Link>
        </form>
    </div>
    )}