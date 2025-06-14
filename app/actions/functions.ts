//  app/actions/functions.ts
// Fetch institutes with authentication
"use server";

// app/actions/functions.ts

import { headers } from "next/headers";
import { NextRequest } from "next/server";

import { auth } from "@/lib/auth";
import { getBaseUrl } from "@/config/site";
import { cache } from "react";
import { prisma } from "@/prisma/dbConnect";
import { baseUrl } from "@/lib/metadata";

export const getInstitutes = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/institutes`, {
      cache: "force-cache",
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

// Define or import the Institute type
type Institute = {
  id: string;
  name: string;
  slug: string;
  acronym: string;
  overview: string;
  about: string;
};


export async function getInstituteBySlug(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/api/institutes/${slug}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching institute:", error);
    return null;
  }
}

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
