"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";

type SignupFields = {
    email: string;
    password: string;
    isAccepted: string;
}

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFields>();

    function handleSubmitFn(data: SignupFields): void {
        console.log(data)
    }

    return (
        <div className="grid place-items-center mt-12">
            <h1 className="text-[32px]">Sign Up</h1>
            <p>Enter your details below & free sign up</p>

            <div className=" min-w-screen bg-gray-700">
                <form onSubmit={handleSubmit(handleSubmitFn)}>
                    <div>
                        <label htmlFor="email">Your Email</label>
                        <input
                            className="bg-gray-600"
                            id="email"
                            type="email"
                            { ...register('email', { required: true }) }
                        />
                        { errors.email && <span className="text-red-500">Se mate! você deve ter um email.</span> }
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            className="bg-gray-600"
                            id="password"
                            type="password"
                            minLength={6}
                            { ...register('password', { required: true, minLength: 6 })}
                        />
                        { errors.password?.type === "required" && <span className="text-red-500">Você deve ter uma senha, inútil!</span> }
                        { errors.password?.type === "minLength" && <span className="text-red-500">Sua senha deve ter no mínimo 6 caracteres, cabaço!</span> }
                    </div>

                    <div>
                        <input
                            id="is-accepted"
                            type="checkbox"
                            { ...register('isAccepted', { required: true })}
                        />
                        <label htmlFor="is-accepted">
                            By creating an account you have to agree with our terms & conditions.
                        </label>
                        { errors.isAccepted && <span className="text-red-500">Você quer criar a conta sem aceitar os termos, animal?!</span> }
                    </div>

                    <button type="submit">Create account</button>
                </form>

                <div>
                    <p>
                        Already have an account? <Link href='/Login'>Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}