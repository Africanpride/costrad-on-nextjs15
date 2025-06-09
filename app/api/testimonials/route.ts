// app/api/testimonials/route.ts

// File: app/api/testimonials/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/app/actions/functions";

const AUTH_TOKEN = process.env.AUTH_TOKEN;

// GET all testimonials (admin only)
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token || token !== AUTH_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const testimonials = await prisma.testimonial.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(testimonials);
}

// POST new testimonial (authenticated user only)
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token || token !== AUTH_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 403 }
    );
  }

  const { content } = await req.json();
  if (!content || content.trim() === "") {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  const testimonial = await prisma.testimonial.create({
    data: {
      userId: user.id,
      content,
    },
  });

  return NextResponse.json(testimonial);
}

// PUT update testimonial (admin only)
export async function PUT(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token || token !== AUTH_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id, approved, featured } = await req.json();
  if (!id)
    return NextResponse.json(
      { error: "Missing testimonial id" },
      { status: 400 }
    );

  const updated = await prisma.testimonial.update({
    where: { id },
    data: {
      approved: approved ?? undefined,
      featured: featured ?? undefined,
    },
  });

  return NextResponse.json(updated);
}

// DELETE testimonial (admin only)
export async function DELETE(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token || token !== AUTH_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await req.json();
  if (!id)
    return NextResponse.json(
      { error: "Missing testimonial id" },
      { status: 400 }
    );

  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
