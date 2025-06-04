// app/api/institutes/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";

export async function GET(request: Request) {
  // const AUTH_TOKEN = process.env.AUTH_TOKEN;
  // const authHeader = request.headers.get("authorization");

  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  // const token = authHeader.split(" ")[1];
  // if (token !== AUTH_TOKEN) {
  //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  // }

  console.log("Fetching institutes...");
  try {
    const institutes = await prisma.institute.findMany({
      include: {
        editions: true,
        
      },
    });
    console.log("Total institutes fetched:", institutes.length);
    console.log(
      "Institutes with editions:",
      institutes.map(i => ({
        id: i.id,
        name: i.name,
        editions: i.editions.length,
      }))
    );
    return NextResponse.json(institutes);
  } catch (err: any) {
    console.error("Error fetching institutes:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}