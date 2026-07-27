"use client";

import { login } from "@/context/AuthContext";
import { ApiResponseData, ApiResponseError } from "@/interfaces/api";
import { AuthPayload, AuthUser } from "@/interfaces/user";
import { SignupForm, SignupRequest } from "@/utils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function handleSubmitFn(
  data: SignupForm,
  setToken: (token: string | null) => void,
  setUser: (user: AuthUser | null) => void,
  router: AppRouterInstance,
) {
  try {
    const birthday = new Date(
      Number(data.birthday.year),
      Number(data.birthday.month),
      Number(data.birthday.day),
    );

    const request: SignupRequest = {
      name: `${data.fullName.name} ${data.fullName.surname}`,
      email: data.email,
      birthday,
      password: data.password,
    };

    const response = await fetch("/api/Auth/Signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const result: ApiResponseData<AuthPayload> | ApiResponseError =
      await response.json();

    if (!result.successed || !("data" in result)) {
      throw new Error(
        "error" in result ? result.error : "Unexpected error, try again later.",
      );
    }

    console.log(request);

    const { token, user } = result.data;

    login(token, user);
    setToken(token);
    setUser(user);
    router.replace("/Home");
  } catch (error) {
    alert(error);
    console.error(error);
  }
}
