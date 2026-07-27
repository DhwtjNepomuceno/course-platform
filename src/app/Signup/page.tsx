"use client";

import { useForm } from "react-hook-form";
import { SignupForm } from "@/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import Input from "@/components/Input";
import { handleSubmitFn } from "./handleSubmit";
import { days, months, years } from "./birthdayArrays";
import Button from "@/components/Button";
import CustomLink from '../../components/Link/index';

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>();
    const router = useRouter();
    const { token, setToken, setUser } = useAuth();

    useEffect(() => {
        if (token) router.replace("/Home")
    }, [router, token])

    return (
        <div className="grid place-items-center mt-12">
            <h1 className="text-title-t">Sign Up</h1>
            <p className="text-center text-subtitle-c text-subtitle-t">Enter your details below & free sign up</p>

            <div className=" min-w-screen min-h-screen bg-surface-c rounded-2xl mt-3 justify-items-center">
                <form onSubmit={handleSubmit((data) => handleSubmitFn(data, setToken, setUser, router))}>

                    <Input
                        label="Your First Name"
                        id="name"
                        type="text"
                        placeholder="Name"
                        autoComplete="given-name"
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
                        autoComplete="family-name"
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

                    <Button type="submit">Create Account</Button>

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

                <CustomLink href="/Login" span="Log in">Already have an account? </CustomLink>

            </div>
        </div>
    );
}