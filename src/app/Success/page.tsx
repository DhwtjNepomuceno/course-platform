"use client"

export default function Success() {
    return (
        <div className="grid justify-items-center items-center mt-12">
            <h1 className="text-title-t">Reset your password</h1>

            <div className="w-[291px] h-[301px] bg-surface-c rounded-2xl mt-[85px] justify-items-center">
                {/* submitted */}
                <div className="justify-items-center">
                    <div className="grid mt-8 w-81.5">
                        <h1 className="text-[15px] ml-5 mr-5 max-w-[291px] text-center">
                            Your password was successfully changed. You may close this tab and Log In.
                        </h1>

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[170px] h-[170px] mt-1 mx-auto"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.2426 14.4142L17.3137 7.34315L18.7279 8.75736L10.2426 17.2426L6 13L7.41421 11.5858L10.2426 14.4142L10.2426 14.4142Z"
                                fill="#3D5CFF"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}