import { ClerkProvider } from "@clerk/nextjs"
import { Clerk } from "@clerk/nextjs/server"
import { Inter } from "next/font/google"
import '../globals.css'

export const metadata = {
    title: 'Threads',
    description: 'A Next JS made by Pratham'
}


const inter = Inter({subsets: ["latin"]})

export default function RootLayout(
    {
        children
    }:
    {
        children: React.ReactNode
    }
){
    return (
    <ClerkProvider>
        <html lang = "en">
            <body className={"${inter.className} bg-dark-1"}>
                <div className="w-full flex justify-center items-center min-h-screen">
                {children}
                </div>
                
            </body>


        </html>

    </ClerkProvider>
    )
}
