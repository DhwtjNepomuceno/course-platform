export interface SignupFields {
    name: string;
    birthday: Date;
    email: string;
    password: string;
}

export interface SignupFieldsUI extends SignupFields {
    isAccepted: boolean;
}