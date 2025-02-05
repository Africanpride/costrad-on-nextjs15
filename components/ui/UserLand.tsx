"use client"

import { useEffect, useState } from "react"
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
import { User as UserIcon, LogOut, Settings } from "lucide-react"
import { SignInButton } from "./auth/signin-button"
import { signOut, useSession } from "@/lib/auth-client"
import { Session } from "@/lib/auth-types"
import { useRouter } from "next/navigation"
import { client } from '../../lib/auth-client';

export default function UserLand() {
    const router = useRouter();

    const [isSignOut, setIsSignOut] = useState<boolean>(false);

    const { data: session } = useSession() as { data: Session };


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
                            <DropdownMenuItem onSelect={
                                () => {
                                    router.push("dashboard");
                                }
                            } className="cursor-pointer">
                                <UserIcon />
                                <span>Profile</span>
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onSelect={
                                () => {
                                    router.push("dashboard");
                                }
                            } >
                                <Settings />
                                <span>Settings</span>
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer"
                            onClick={async () => {
                                setIsSignOut(true);
                                await signOut({
                                    fetchOptions: {
                                        onSuccess() {
                                            router.push("/");
                                        },
                                    },
                                });
                                setIsSignOut(false);
                            }} >
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
