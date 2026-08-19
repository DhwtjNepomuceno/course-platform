"use client"

import Button from "@/components/Button"
import { useForm } from "react-hook-form"
import { ResetPasswordForm } from "@/utils"
import { useSearchParams } from "next/navigation"
import { useWatch } from "react-hook-form";
import { handleSubmitFn } from "./handleSubmit"
import { useState } from "react"
import CustomInputMT8 from "@/components/Input"
import CustomInputMT2 from "@/components/InputMT-2.5"

export default function ResetPassword() {

    const { register, handleSubmit, control, formState: { errors } } = useForm<ResetPasswordForm>();
    const [submitted, setSubmitted] = useState(false);
    const [hasAlert, setHasAlert] = useState<string | null>(null);

    const newPassword = useWatch({ control, name: "newPassword" })
    const searchParams = useSearchParams();
    const expirationLink = searchParams.get("expiration");
    const email = searchParams.get("email")!;
    const expiration = atob(expirationLink!)

    return (
        <div className="grid place-items-center mt-[44px]">
            <h1 className="text-title-t">Reset your password</h1>

            {submitted ? (
                <div className="w-[300px] h-[310px] bg-surface-c rounded-2xl mt-15 justify-items-center">
                    <div className="grid mt-8 w-81.5">
                        <h1 className="text-[15px] ml-5 mr-5 max-w-[291px] text-center">
                            Your password was successfully changed. You may close this tab and Log In.
                        </h1>

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[170px] h-[170px] mt-1 mx-auto"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.2426 14.4142L17.3137 7.34315L18.7279 8.75736L10.2426 17.2426L6 13L7.41421 11.5858L10.2426 14.4142L10.2426 14.4142Z"
                                fill="#3D5CFF"
                            />
                        </svg>
                    </div>
                </div>
            ) : (
                <div className="grid place-items-center">
                    <p className="text-center text-subtitle-c text-subtitle-t">Reset your password by entering the new one twice.</p>
                    <div className="min-w-screen min-h-screen bg-surface-c rounded-2xl mt-[44px] justify-items-center">
                        <form onSubmit={handleSubmit(async (data) => {
                            const response = await handleSubmitFn(data.newPassword, email, expiration, setSubmitted)
                            if (response?.error) {
                                setHasAlert(response.message);
                                console.log(response.message)
                            }
                            return response;
                        }
                        )}>
                            <CustomInputMT8
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

                            <CustomInputMT2
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
                            <Button type="submit">Update password</Button>
                        </form>
                    </div>
                </div>
            )}
            {
                hasAlert && <dialog open className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-c rounded-xl p-6 shadow-lg text-center">
                    <p className="text-sm text-subtitle-t text-white">{hasAlert}</p>
                </dialog>
            }
        </div>

    )

}