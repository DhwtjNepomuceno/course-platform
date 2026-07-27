"use client"

import Link from "next/link"

export default function CustomLink({href, children, span}: {href: string, children: string, span: string}) {

    return (
        <div className="mt-5">
            <Link href={href} className="text-error-t text-[#9a9aad] text-[14px]">{children}<span className="text-blue-600 hover:underline hover:text-blue-500">{span}</span></Link>
        </div>
    )

}