"use client";
import { useEffect, useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { Button } from "@heroui/button";
import { LogOut, LucideArrowUpRight, UserIcon } from "lucide-react";
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
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export function SignInButton() {
  const router = useRouter(); // Use Next.js router
  const [isSignOut, setIsSignOut] = useState<boolean>(false);

  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = client.useSession();

  // console.log("Session Data:", session);

  return (
    <>
      {!session ? (
        <div className="flex items-center gap-0 h-7 pr-2">
          <Button
            onPress={() => router.push("/auth/sign-in")} // Redirect to the sign-in page
            className="uppercase  bg-secondary text-secondary font-bold cursor-pointer h-full "
            size="sm"
            variant="solid"
          >
            <span className="text-sm normal-case text-foreground  ">
              {session ? "" : "LOGIN/SIGNUP"}
            </span>
          </Button>
          <LucideArrowUpRight className="bg-primary text-secondary text-[5em] h-full" />
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
           <Avatar className="hidden h-9 w-9 sm:flex ">
							<AvatarImage
								src={session?.user.image || "#"}
								alt="Avatar"
								className="object-cover"
							/>
							<AvatarFallback>{session?.user.name.charAt(0)}</AvatarFallback>
						</Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="cursor-pointer">
              <DropdownMenuItem
                onSelect={() => {
                  router.push("dashboard");
                }}
                className="cursor-pointer"
              >
                <UserIcon />
                <span>Dashboard</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                await client.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/"); // redirect to login page
                    },
                  },
                });
              }}
            >
              <LogOut />
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
