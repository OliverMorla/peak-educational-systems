import { Metadata } from "next";

export const metadata: Metadata = {
    title: "",
    description: ""
}

export default function AuthLayout({children}: {children: React.ReactNode}){
    return(
        <>
        {children}
        </>
    )
}