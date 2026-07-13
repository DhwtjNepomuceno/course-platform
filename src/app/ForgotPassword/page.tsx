"use client"

import { ForgotPasswordForm } from "@/utils"
import Link from "next/link"
import { useForm } from "react-hook-form"

export default function ForgotPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>()

    async function handleSubmitFn(data: ForgotPasswordForm) {
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
            <h1 className="text-title-t">Forgot my password</h1>
            <p className="text-center text-[#a8a8c5] max-w-100 text-subtitle-t">In order to reset your password, enter your e-mail and we&apos;ll send a code.</p>

            <div className="min-w-screen min-h-screen bg-surface-c rounded-2xl mt-3 justify-items-center">
                <form onSubmit={handleSubmit(handleSubmitFn)}>

                    <div className="grid mt-2.5 w-81.5">
                        <label htmlFor="email">Your E-mail</label>
                        <input
                            className={`bg-input-c w-81.5 h-12.5 rounded-lg pl-4 outline-none transition-all hover:bg-gray-500 hover:placeholder:text-gray-300
                            ${errors.email && "outline outline-error-c"}`}
                            id="email"
                            type="email"
                            placeholder="E-mail"
                            autoComplete="email"
                            {...register('email', { required: true })}
                        />
                        {errors.email && <span className="text-error-c text-error-t max-w-81.5">
                            * You must enter your e-mail adress.</span>}
                    </div>
                    <Link href="/ResetPassword">
                        <button
                            className="bg-blue-600 w-81.5 h-12.5 rounded-lg mt-5 mb-1 hover:bg-blue-500"
                            type="submit">Next</button>
                    </Link>

                </form>
                <div>
                    <Link href='/Login' className="text-error-t mt-4 hover:text-blue-300 hover:underline">Cancel</Link>
                </div>
            </div>

        </div >
    )
}