import { auth } from "@/auth"
import { signOut } from "@/auth"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await auth()
    console.log('session returned', session )
    return NextResponse.json(session)
}
export async function POST() {
    console.log("signing out now")
    await signOut({redirect:true, redirectTo: '/'}) // Ensure this works with your specific auth setup
    return NextResponse.json({ message: "Signed out successfully" })
}
