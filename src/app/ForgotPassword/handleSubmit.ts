"use client"

import { ForgotPasswordForm } from "@/utils";

export async function handleSubmitFn(
    data: ForgotPasswordForm, 
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
)  {
        try {
            const response = await fetch("api/Auth/ForgotPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (result) {
                setSubmitted(true);
            }

            console.log(result)
        } catch (error) {
            console.error(error)
        }
    }