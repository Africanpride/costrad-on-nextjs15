import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";

export async function GET() {
    console.log("Getting editions ....")
  try {
    const editions = await prisma.edition.findMany();
    return NextResponse.json(editions);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch editions" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const edition = await prisma.edition.create({ data });
    return NextResponse.json(edition);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create edition" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const edition = await prisma.edition.update({ where: { id: data.id }, data });
    return NextResponse.json(edition);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update edition" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await prisma.edition.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete edition" }, { status: 500 });
  }
}