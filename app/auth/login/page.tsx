"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Clickable Logo */}
      <Link href="/">
        <Image
          src="/images/costrad.png"
          alt="Costrad Logo"
          width={150}
          height={150}
          className="cursor-pointer"
        />
      </Link>

      <h1 className="text-2xl font-bold mt-4">Sign In</h1>

      <div className="mt-6 space-y-4">
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          Sign in with GitHub
        </button>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
