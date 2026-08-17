"use client"

import { ForgotPasswordForm } from "@/utils"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { handleSubmitFn } from "./handleSubmit";

export default function ForgotPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>()
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="grid place-items-center mt-[32.5px]">
            <h1 className="text-title-t">Forgot my password</h1>
            <p className="text-center text-[#a8a8c5] max-w-100 text-subtitle-t">In order to reset your password, enter your e-mail and we&apos;ll send a code.</p>

            <div className="w-screen h-screen bg-surface-c rounded-2xl mt-[32.5px]">
                {submitted ? (
                    <div className="justify-items-center">
                        <div className="grid mt-8 w-86">
                            <h1 className="text-[15px] text-center">A Link was sent to your e-mail. If you can&apos;t find it, check on spam</h1>
                            <button
                                className="bg-button-c w-86 h-12.5 rounded-xl mt-5 mb-1 hover:bg-button-hover-c"
                                type="button" onClick={() => router.push("/Login")}>Back to Login
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="justify-items-center">
                        <form onSubmit={handleSubmit((data) => handleSubmitFn(data, setSubmitted))}>

                            <div className="grid mt-2.5 w-86">
                                <label htmlFor="email">Your E-mail</label>
                                <input
                                    className={`bg-input-c w-86 h-12.5 rounded-2xl pl-4 outline-none transition-all hover:bg-gray-500 hover:placeholder:text-gray-300
                            ${errors.email && "outline outline-error-c"}`}
                                    id="email"
                                    type="email"
                                    placeholder="E-mail"
                                    autoComplete="email"
                                    {...register('email', { required: true })}
                                />
                                {errors.email && <span className="text-error-c text-error-t max-w-86">
                                    * You must enter your e-mail adress.</span>}
                            </div>

                            <button
                                className="bg-button-c w-86 h-12.5 rounded-xl mt-5 mb-1 hover:bg-button-hover-c"
                                type="submit">Next
                            </button>
                        </form>
                        <div>
                            <Link href='/Signup' className="text-[14px] text-gray-400 mt-4">Cancel</Link>
                        </div>
                    </div>
                )}


            </div >
        </div>

    )
}