// app/api/institutes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";

const AUTH_TOKEN = process.env.AUTH_TOKEN;

function checkAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader.split(" ")[1];
  if (token !== AUTH_TOKEN) {
    console.log("Failed with auth token");
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}

// GET handler
export async function GET(req: NextRequest) {
  // const authResult = checkAuth(req);
  // if (authResult) return authResult;

  console.log("Getting institutes ....");
  try {
    const institutes = await prisma.institute.findMany({
      where: {
        active: true, // Only fetch active institutes
      },
      include: {
        editions: true
      }
    });
    return NextResponse.json(institutes);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch institutes" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// POST handler
export async function POST(req: NextRequest) {
  const authResult = checkAuth(req);
  if (authResult) return authResult;

  try {
    const data = await req.json();
    const institute = await prisma.institute.create({ data });
    return NextResponse.json(institute);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to create institute" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// PUT handler
export async function PUT(req: NextRequest) {
  const authResult = checkAuth(req);
  if (authResult) return authResult;

  try {
    const data = await req.json();
    if (!data.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const institute = await prisma.institute.update({ where: { id: data.id }, data });
    return NextResponse.json(institute);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to update institute" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE handler
export async function DELETE(req: NextRequest) {
  const authResult = checkAuth(req);
  if (authResult) return authResult;

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await prisma.institute.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to delete institute" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}