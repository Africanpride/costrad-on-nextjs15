"use client"
import { useEffect, useState } from "react"
import { useRouter, redirect } from 'next/navigation';
import { Button } from "@heroui/button"
import { LogOut, LucideArrowUpRight, UserIcon } from "lucide-react"
import { client, signOut } from "@/lib/auth-client";
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
import { User } from "@heroui/react";

export function SignInButton() {
  const router = useRouter(); // Use Next.js router
  const [isSignOut, setIsSignOut] = useState<boolean>(false);

  const {
    data: session,
    isPending, //loading state
    error //error object
  } = client.useSession()

  return (
    <>
      {!session ? (
        <Button
          onPress={() => router.push("/auth/sign-in")} // Redirect to the sign-in page
          className="uppercase rounded-none bg-purple-700 text-white font-bold"
          size="sm"
          variant="solid"
          endContent={<LucideArrowUpRight className="bg-black text-white" />}
        >
          <span className="text-sm normal-case">{session ? "" : "LOGIN/SIGNUP"}</span>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>

            <User
              as="button"
              avatarProps={{
                isBordered: false,
                src: session?.user.image ?? "https://i.pravatar.cc/150",
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
                <span>Dashboard</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>

            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer"
              onClick={async (e) => {
                e.preventDefault();
                await client.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/"); // redirect to login page
                    },
                  },
                });
              }} >
              <LogOut />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
