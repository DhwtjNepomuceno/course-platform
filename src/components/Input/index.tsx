
export default function Input({label, id, type, placeholder}: {label: string, id: string, type: string, placeholder: string}) {

    return (
        <div className="grid mt-2.5 w-81.5">
            <label className="text-label-c text-label-t ml-1" htmlFor={id}>{label}</label>
            <input
                className="bg-input-c w-81.5 h-12.5 rounded-2xl pl-4 outline-none transition-all hover:bg-input-hover-c hover:placeholder:text-placeholder-hover-c"
                id={id}
                type={type}
                placeholder={placeholder}
            />
        </div>
    )
}