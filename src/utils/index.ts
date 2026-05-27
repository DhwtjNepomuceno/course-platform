export interface DefaultFields {
    email: string;
    code: string;
}

export interface LoginFields extends DefaultFields {
    password: string;
}

export interface BackSignupFields extends DefaultFields {
    name: string;
    birthday: Date;
    password: string;
}

export interface SignupFields extends BackSignupFields {
    isAccepted: boolean;
}