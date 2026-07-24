export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  birthday: Date;
  password: string;
}

export interface SignupForm {
  fullName: {
    name: string;
    surname: string;
  };
  email: string;
  birthday: {
    day: number;
    month: number;
    year: number;
  };
  password: string;
  isAccepted: boolean;
}
