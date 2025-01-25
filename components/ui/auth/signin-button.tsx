"use client"
import { Button } from "@heroui/button"
import { LucideArrowUpRight } from "lucide-react"
import { signIn } from "next-auth/react"

export function SignInButton() {
  const isDark = false; // Define the isDark variable
  return <Button onPress={() => signIn()} className='uppercase rounded-none bg-purple-700 text-white font-bold ' size={'sm'} variant="solid"
    endContent={<LucideArrowUpRight className='bg-black  text-white' />}>
    <span className='text-sm normal-case '>LOGIN/SIGNUP</span>
  </Button>
}