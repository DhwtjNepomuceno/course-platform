import { ApiResponseData, ApiResponseError } from "@/interfaces/api";
import { AuthPayload } from "@/interfaces/user";
import { ResetPasswordForm } from "@/utils";

export async function handleSubmitFn(data: ResetPasswordForm, expiration: number) {
        try {

            if (Date.now() > expiration) {
                throw new Error("Expired link. Request for a new reset link.")
            }

            const response = await fetch("/api/Auth/ResetPassword", {
                method: "PUT",
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