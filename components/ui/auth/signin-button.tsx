"use client"
import { useRouter } from "next/navigation"
import { Button } from "@heroui/button"
import { LucideArrowUpRight } from "lucide-react"

export function SignInButton() {
  const router = useRouter(); // Use Next.js router

  return (
    <Button 
      onPress={() => router.push("/sign-in")} // Redirect to the sign-in page
      className="uppercase rounded-none bg-purple-700 text-white font-bold" 
      size="sm" 
      variant="solid"
      endContent={<LucideArrowUpRight className="bg-black text-white" />}
    >
      <span className="text-sm normal-case">LOGIN/SIGNUP</span>
    </Button>
  );
}
