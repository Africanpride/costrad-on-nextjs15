import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";

export async function GET() {
  console.log("Getting editions ....");
  try {
    const editions = await prisma.edition.findMany({
      include: {
        institute: true,
      },
    });
    return NextResponse.json(editions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch editions" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const edition = await prisma.edition.create({ data });
    return NextResponse.json(edition);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create edition" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Incoming update payload:", data);

    const { id, ...rest } = data;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    // Confirm record exists
    const existing = await prisma.edition.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Edition not found" },
        { status: 404 }
      );
    }

    // Optional: map only known safe fields
    const allowedFields = ["active", "title", "description", "year"];
    const dataToUpdate: Record<string, any> = {};
    for (const field of allowedFields) {
      if (field in rest) {
        dataToUpdate[field] = rest[field];
      }
    }

    const edition = await prisma.edition.update({
      where: { id },
      data: dataToUpdate,
    });

    console.log("✅ Updated edition:", edition);
    return NextResponse.json(edition);
  } catch (error: any) {
    console.error("❌ Update edition error:", error);
    return NextResponse.json(
      { error: error.message ?? "Failed to update edition" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await prisma.edition.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete edition" },
      { status: 500 }
    );
  }
}
