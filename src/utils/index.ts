export interface ForgotPasswordForm {
    email: string;
}

export interface LoginForm {
    email: string
    password: string;
}

export interface SignupRequest {
    name: string;
    email: string
    birthday: Date;
    password: string;
}

export interface SignupForm extends SignupRequest {
    isAccepted: boolean;
}