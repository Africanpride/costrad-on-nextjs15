"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignOutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for a smoother experience
    setTimeout(() => {
      signOut({ callbackUrl: "/" }).then(() => setLoading(false));
    }, 2000); // 2 seconds delay
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Costrad Logo */}
      <Image src="/images/costrad.png" alt="Costrad Logo" width={150} height={150} priority />

      <h1 className="text-2xl font-semibold mt-4">Signing you out...</h1>

      {/* Show a loading spinner */}
      {loading ? (
        <div className="mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-gray-900"></div>
      ) : (
        <p className="mt-4 text-gray-600">You have been signed out.</p>
      )}

      <p className="mt-2 text-gray-500">
        Redirecting to{" "}
        <a href="/" className="text-blue-500 underline">
          Home
        </a>
        ...
      </p>
    </div>
  );
}
