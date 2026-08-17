export default function CustomButton({ children, type, action }: { children: string, type: "submit" | "button", action?: () => void }) {

    return (
        <button
            className="bg-button-c w-86 h-12.5 rounded-xl mt-5 mb-1 hover:bg-button-hover-c"
            type={type} onClick={action}>{children}</button>
    )
}