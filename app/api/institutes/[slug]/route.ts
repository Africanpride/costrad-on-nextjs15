import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
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

// PUT handler
export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ slug: string }> }
) {
  console.log("IGNITION....PUT REQUEST");
  const params = await props.params;
  try {
    const institute = await prisma.institute.delete({
      where: { slug: params.slug },
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
