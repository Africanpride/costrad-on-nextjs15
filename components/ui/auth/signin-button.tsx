"use client"
import { useRouter } from "next/navigation"
import { Button } from "@heroui/button"
import { LucideArrowUpRight } from "lucide-react"
import { client } from "@/lib/auth-client";

export function SignInButton() {
  const router = useRouter(); // Use Next.js router

  const {
    data: session,
    isPending, //loading state
    error //error object
  } = client.useSession()

  return (
    <Button
      onPress={() => router.push("/auth/sign-in")} // Redirect to the sign-in page
      className="uppercase rounded-none bg-purple-700 text-white font-bold"
      size="sm"
      variant="solid"
      endContent={<LucideArrowUpRight className="bg-black text-white" />}
    >
      <span className="text-sm normal-case">{session?.user ? "" : "LOGIN/SIGNUP" }</span>
    </Button>
  );
}
