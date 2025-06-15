import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { getCurrentUser } from "@/app/actions/functions";

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
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const data = await req.json();
  const { id, ...rest } = data;

  if (!id) {
    return NextResponse.json({ error: "Missing edition id" }, { status: 400 });
  }


  try {
    const updated = await prisma.edition.update({
      where: { id },
      data: rest,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("❌ Failed to update edition:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Edition not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to update edition" },
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
