"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";
import Link from "next/link";

export default function EmailVerification() {
	const [signupEmail, setSignupEmail] = useState<string | null>(null);
	const session = useSession(); // Get the user's session
	const router = useRouter(); // Initialize the router

	// Retrieve the email from sessionStorage
	useEffect(() => {
		const emailFromStorage = sessionStorage.getItem("signupEmail");

		// Redirect to sign-in page if no email is found in sessionStorage
		if (!emailFromStorage) {
			router.push("/auth/sign-in");
		}

		setSignupEmail(emailFromStorage);
	}, [router]);

	// Redirect to home if user is already signed in
	useEffect(() => {
	if (session?.session?.token && session.session.token.length > 0) {
			router.push("/");
		}
	}, [session, router]);

	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Verify Email to Continue ...</CardTitle>
					<CardDescription>
						An email has been sent to{" "}
						<span className="font-bold text-green-500">{signupEmail}</span>. 
					</CardDescription>
				</CardHeader>
				<CardContent>
					Visit your inbox to verify your email. If not in your inbox, kindly check your spam folder.
				</CardContent>
				<CardFooter>
					<Button type="submit" className="w-full" asChild>
						<Link href="/">Back to Website</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
