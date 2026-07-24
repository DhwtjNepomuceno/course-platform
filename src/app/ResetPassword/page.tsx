"use client"

import Input from "@/components/Input"
import Button from "@/components/Button"
import { useForm } from "react-hook-form"
import { ResetPasswordForm } from "@/utils"
import { useSearchParams } from "next/navigation"
import { ApiResponseData, ApiResponseError } from "@/interfaces/api"
import { AuthPayload } from "@/interfaces/user"
import { useWatch } from "react-hook-form";

export default function ResetPassword() {

    const { register, handleSubmit, control, formState: { errors } } = useForm<ResetPasswordForm>();

    const newPassword = useWatch({ control, name: "newPassword" })
    const now = Date.now();
    const searchParams = useSearchParams();
    const expirationLink = searchParams.get("expiration");
    const expiration = expirationLink ? atob(expirationLink) : null
    console.log(expiration, now);

    async function handleSubmitFn(data: ResetPasswordForm) {
        try {

            if (Date.now() > expiration) {
                throw new Error("Expired link. Request for a new reset link.")
            }

            const response = await fetch("/api/Auth/ResetPassword", {
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

        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="grid place-items-center mt-12">
            <h1 className="text-title-t">Reseting your password</h1>


            <div className="min-w-screen min-h-screen bg-surface-c rounded-2xl mt-3 justify-items-center">
                <form onSubmit={handleSubmit(handleSubmitFn)}>
                    <Input
                        label="Enter you new password"
                        id="password"
                        type="password"
                        placeholder="New password"
                        autoComplete="new-password"
                        minLength={6}
                        error={!!errors.newPassword}
                        errorMessage={
                            errors.newPassword?.type === "required"
                                ? "* You must enter your password."
                                : errors.newPassword?.type === "minLength"
                                    ? "* Your password must be 6 characters or more."
                                    : undefined
                        }
                        register={register("newPassword", {
                            required: true,
                            minLength: 6
                        })}
                    />

                    <Input
                        label="Confirm your new password"
                        id="confirmPassword"
                        type="password"
                        placeholder="New password"
                        autoComplete="new-password"
                        minLength={6}
                        error={!!errors.confirmPassword}
                        errorMessage={
                            errors.confirmPassword?.type === "required"
                                ? "* You must enter your password."
                                : errors.confirmPassword?.type === "minLength"
                                    ? "* Your password must be 6 characters or more."
                                    : errors.confirmPassword?.type === "validate"
                                        ? "* The passwords do not match."
                                        : undefined
                        }
                        register={register("confirmPassword", {
                            required: true,
                            minLength: 6,
                            validate: (value) => value === newPassword || "The passwords doesn't match.",
                        })}
                    />
                    <Button type="submit">Back to Login</Button>
                </form>

            </div>
        </div>

    )
}