"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Loader2, Key } from "lucide-react";
import { client, signIn } from "@/lib/auth-client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SignInComponent from "@/components/sign-in";
import { SignUpComponent } from "@/components/sign-up";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // useEffect(() => {
  //   client.oneTap();
  // }, []);
  return (
    <SignInComponent />

  );
}