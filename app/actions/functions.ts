//  app/actions/functions.ts
// Fetch institutes with authentication
"use server";

// app/actions/functions.ts

import { headers } from "next/headers";
import { NextRequest } from "next/server";

import { auth } from "@/lib/auth";
import { getBaseUrl } from "@/config/site";

export const getInstitutes = async () => {
  try {
    const res = await fetch(`${getBaseUrl()}/api/institutes`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
      },
      next: { revalidate: 7200 }, // seconds
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

export async function getCurrentUser(req?: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user ?? null;
}

export async function getCurrentSession(req?: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session ?? null;
}
