"use client";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MainLogo from "@/components/ui/MainLogo";
import { siteConfig } from "@/config/site";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Redirect to home if logged in
    }
  }, [status, router]);

  // ✅ Don't render the login page until session status is determined
  if (status === "loading" || status === "authenticated") {
    return (
      <Suspense fallback={<Loading />}>
        <div className="h-screen flex items-center justify-center">
          <p className="text-lg">Checking authentication...</p>
        </div>
      </Suspense>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-screen">
      <div className="sm:flex justify-center items-center hidden">
        <MainLogo />
      </div>
      <div className="bg-blue-700 flex justify-center items-center">
        <Card className="overflow-hidden rounded-none">
          <CardContent>
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your {siteConfig.shortName} account
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Button onClick={() => signIn("google", { callbackUrl: "/" })} variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">Login</Button>
                <div className="text-center text-sm">
                  Don&apos;t have an account? <Link href="/signup" className="underline">Sign up</Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
