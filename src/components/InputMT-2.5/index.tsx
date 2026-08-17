import { UseFormRegisterReturn } from "react-hook-form"

type InputProps = {
    label: string;
    id: string;
    type: string;
    placeholder?: string;
    autoComplete?: string;
    minLength?: number;
    error?: boolean;
    errorMessage?: string;
    register: UseFormRegisterReturn;
}

export default function CustomInputMT2(
    {
        label,
        id,
        type,
        placeholder,
        autoComplete,
        minLength,
        error,
        errorMessage,
        register }: InputProps) {

    return (
        <div className="grid mt-2.5 w-86">
            <label className="text-label-c ml-1" htmlFor={id}>{label}</label>
            <input
                className={`bg-input-c w-86 h-12.5 rounded-2xl pl-4 outline-none transition-all hover:bg-input-hover-c hover:placeholder:text-placeholder-hover-c
                ${error && "outline outline-error-c"}`}
                id={id}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                minLength={minLength}
                {...register}
                
            />
            {error && (<span className="text-error-c text-[12px] max-w-81.5">{errorMessage}</span>)}
        </div>
    )
}