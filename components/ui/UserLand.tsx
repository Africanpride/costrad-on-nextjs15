"use client"

import { useEffect, useState } from "react"
import { signIn, signOut } from "@/auth"
import { Session } from "@auth/core/types"
import { User } from "@heroui/react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User as UserIcon, LogOut } from "lucide-react"
import { SignInButton } from "./auth/signin-button"

export default function UserLand() {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        async function fetchSession() {
            const res = await fetch("/api/auth/session") // Fetch from API
            const sessionData: Session | null = await res.json()
            setSession(sessionData)
        }
        fetchSession()
    }, [])

    async function handleSignOut() {
        // Send a request to your API to log out
        const res = await fetch("/api/auth/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (res.ok) {
            // Optionally, handle any state changes after sign-out, like redirecting the user
            window.location.reload() // For example, reload the page to reflect the state
        } else {
            console.error("Failed to sign out")
        }
    }


    return (
        <>
            {session?.user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <User
                            as="button"
                            avatarProps={{
                                isBordered: false,
                                src: session.user.image ?? "https://i.pravatar.cc/150",
                            }}
                            className="transition-transform text-neutral-950 dark:text-white text-small"
                            description={session.user.email ?? ""}
                            name={session.user.name ?? "User"}
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-60">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup className="cursor-pointer">
                            <DropdownMenuItem className="cursor-pointer">
                                <UserIcon />
                                <span>Profile</span>
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleSignOut()}>
                            <LogOut />
                            <span>Log out</span>
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <SignInButton />
            )}
        </>
    )
}
