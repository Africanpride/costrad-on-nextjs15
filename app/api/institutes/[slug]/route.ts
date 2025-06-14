import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const institute = await prisma.institute.findUnique({
      where: { slug: params.slug },
      include: { editions: true },
    });

    if (!institute) {
      return NextResponse.json(
        { error: "Institute not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(institute);
  } catch (error) {
    console.error("Error fetching institute:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}