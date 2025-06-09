//  app/actions/functions.ts
// Fetch institutes with authentication
"use server"

import { prisma } from "@/prisma/dbConnect";
import { cookies } from "next/headers";

export const getInstitutes = async () => {
  try {
    const res = await fetch("/api/institutes", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
    }
    const institutes = await res.json();
    return institutes;
    //   setInstitutes(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Failed to fetch institutes:", err);
  }
};



export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  return session?.user ?? null;
}