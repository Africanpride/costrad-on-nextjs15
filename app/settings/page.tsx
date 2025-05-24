import { RedirectToSignUp, SignedIn } from "@daveyplate/better-auth-ui";
import Image from "next/image";

export default function Settings() {
  return (
    <>
      <RedirectToSignUp />

      <SignedIn>Welcome! You are signed in.</SignedIn>
    </>
  );
}
