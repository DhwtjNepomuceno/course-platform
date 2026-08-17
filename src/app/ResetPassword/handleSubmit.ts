import { ApiResponseData, ApiResponseError } from "@/interfaces/api";
import { AuthPayload } from "@/interfaces/user";

export async function handleSubmitFn(password: string, email: string, expiration: string, setSubmitted: React.Dispatch<React.SetStateAction<boolean>>) {
        try {
            const now = Date.now();

            if(now > Number(expiration)){
                alert("The link has expired. Try again")
            } 

            if(!password || !email) {
                return alert("Missing data")
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