"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { SignupForm, SignupRequest } from "@/utils";
import { useRouter } from "next/navigation";
import { ApiResponseData, ApiResponseError } from "@/interfaces/api";
import { AuthPayload } from "@/interfaces/user";
import { login, useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import Input from "@/components/Input";

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>();
    const router = useRouter();
    const { token, setToken, setUser } = useAuth();

    const days = Array.from(
        { length: 31 },
        (_, index) => index + 1
    );

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    const years = Array.from(
        { length: 2010 - 1920 + 1 },
        (_, index) => index + 1920
    );

    useEffect(() => {
        if (token) router.replace("/Home")
    }, [router, token])

    async function handleSubmitFn(data: SignupForm) {
        try {
            const request: SignupRequest = {
                name: `${data.fullName.name} ${data.fullName.surname}`,
                email: data.email,
                birthday: data.birthday.day + data.birthday.month + data.birthday.year,
                password: data.password,
            };

            const response = await fetch("/api/Auth/Signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            })
            const result: ApiResponseData<AuthPayload> | ApiResponseError = await response.json()

            if (!result.successed || !("data" in result)) {
                throw new Error("error" in result ? result.error : "Unexpected error, try again later.");
            }

            const { token, user } = result.data;

            login(token, user);
            setToken(token);
            setUser(user);
            router.replace("/Home")
        } catch (error) {
            alert(error)
            console.error(error)
        }
    }

    return (
        <div className="grid place-items-center mt-12">
            <h1 className="text-title-t">Sign Up</h1>
            <p className="text-center text-subtitle-c text-subtitle-t">Enter your details below & free sign up</p>

            <div className=" min-w-screen min-h-screen bg-surface-c rounded-2xl mt-3 justify-items-center">
                <form onSubmit={handleSubmit(handleSubmitFn)}>

                    <Input
                        label="Your First Name"
                        id="name"
                        type="text"
                        placeholder="Name"
                        autoComplete="name"
                        minLength={6}
                        error={!!errors.fullName?.name}
                        errorMessage="* You must enter your name."
                        register={register("fullName.name", { required: true })}
                    />

                    <Input
                        label="Your Last Name"
                        id="surname"
                        type="text"
                        placeholder="Surname"
                        autoComplete="name"
                        minLength={6}
                        error={!!errors.fullName?.surname}
                        errorMessage="* You must enter your last name."
                        register={register("fullName.surname", { required: true })}
                    />

                    <div className="grid max-w-81.5">

                        <label className="text-label-c ml-1 mt-2.5">Birthday</label>

                        <div className="flex gap-4.5">
                            <div className="grid">
                                <select className="bg-input-c w-18.5 h-10 rounded-xl text-center text-[#a4a3ad] text-subtitle-t outline-none"
                                    {...register("birthday.day")}>
                                    <option value="">Day</option>

                                    {days.map((day) => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid">
                                <select className="bg-input-c w-35 h-10 rounded-xl text-center text-[#a4a3ad] text-subtitle-t outline-none"
                                    {...register("birthday.month", { valueAsNumber: true })}>
                                    <option value="">Month</option>

                                    {months.map((month, index) => (
                                        <option key={month} value={index}>{month}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid">
                                <select className="bg-input-c w-20 h-10 rounded-xl text-center text-[#a4a3ad] text-subtitle-t outline-none"
                                    {...register("birthday.year")}>
                                    <option value="">Year</option>

                                    {years.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <Input
                        label="E-mail"
                        id="email"
                        type="email"
                        placeholder="E-mail"
                        autoComplete="email"
                        error={!!errors.email}
                        errorMessage="* You must enter your e-mail adress."
                        register={register("email", { required: true })}
                    />

                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        minLength={6}
                        error={!!errors.password}
                        errorMessage={
                            errors.password?.type === "required"
                                ? "* You must enter your password."
                                : errors.password?.type === "minLength"
                                    ? "* Your password must be 6 characters or more."
                                    : undefined
                        }
                        register={register("password", {
                            required: true,
                            minLength: 6,
                        })}
                    />

                    <button
                        className="bg-button-c w-81.5 h-12.5 rounded-lg mt-5 hover:bg-blue-500"
                        type="submit">Create Account</button>

                    <div className="flex items-start gap-2 mt-5 max-w-81.5">
                        <input
                            id="is-accepted"
                            type="checkbox"
                            className="mt-1 accent-[#9696cd] outline-none cursor-pointer"
                            {...register('isAccepted', { required: true })}
                        />
                        <div className="grid gap-1">
                            <label
                                className="text-[14px] text-[#9a9aad] max-w-81.5 leading-tight hover:underline"
                                htmlFor="is-accepted">
                                By creating an account you have to agree with our terms & conditions.
                            </label>
                            {errors.isAccepted &&
                                <span className="text-error-c">
                                    * You must accept the terms before signing up.</span>}
                        </div>
                    </div>



                </form>

                <div className="mt-5">
                    <Link href='/Login' className="text-error-t text-[#9a9aad] text-[14px]">Already have an account? <span className="text-blue-600 hover:underline hover:text-blue-500">Log in</span></Link>
                </div>
            </div>
        </div>
    );
}