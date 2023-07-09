import { Metadata } from "next"

export const metadata: Metadata = {
    title: "PES - Blog",
    description: "Develop your articles and share them with the world.",
}

export default function BlogLayout({children}: {children: React.ReactNode}){
    return(
        <>
        {children}
        </>
    )
}