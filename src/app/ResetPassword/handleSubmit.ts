import { ApiResponseData, ApiResponseError } from "@/interfaces/api";
import { AuthPayload } from "@/interfaces/user";

export async function handleSubmitFn(password: string, email: string, expiration: string, setSubmitted: React.Dispatch<React.SetStateAction<boolean>>) {
        try {
            const now = Date.now();

            if(now > Number(expiration)){
                return {message: "The link has expired. Try again", error: true}
            } 

            if(!password || !email) {
                return {message: "Missing data", error: true}
            }

            const response = await fetch("/api/Auth/ResetPassword", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            })
            const result: ApiResponseData<AuthPayload> | ApiResponseError = await response.json()

            if (!result.successed) {
                throw new Error("error" in result ? result.error : "Unexpected error, try again later.");
            }

            if (result) {
                setSubmitted(true);
            }

        } catch (error) {
            alert(error)
        }
    }