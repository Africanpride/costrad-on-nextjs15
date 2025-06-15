import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { revalidatePath } from "next/cache";

export async function GET(
  request: NextRequest,
  { params }: { params: { slugOrId: string } }
) {
  const identifier = params.slugOrId;
  

  try {
    const institute = await prisma.institute.findFirst({
      where: {
        OR: [
          { slug: identifier },
          { id: identifier },
        ],
      },
      include: { editions: true },
    });

    if (!institute) {
      console.log("Absolute fetch failure.......");
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { slugOrId: string } }
) {
  console.log("🔥 PUT request received");

  const identifier = params.slugOrId;
  const json = await request.json();

  const fields = [
    "name",
    "acronym",
    "overview",
    "about",
    "introduction",
    "seo",
    "banner",
    "logo",
    "icon",
  ];
  const data: Record<string, any> = {};

  for (const field of fields) {
    const value = json[field];
    if (value !== undefined && value !== null && value !== "") {
      data[field] = value;
    }
  }

  console.log("📦 Sanitized update payload:", data);

  try {
    const existing = await prisma.institute.findFirst({
      where: {
        OR: [
          { slug: identifier },
          { id: identifier },
        ],
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Institute not found" },
        { status: 404 }
      );
    }

    const updatedInstitute = await prisma.institute.update({
      where: { id: existing.id },
      data,
    });

    revalidatePath(`/admin/institutes/${existing.slug}/edit`);

    return NextResponse.json(updatedInstitute);
  } catch (error: any) {
    console.error("❌ Error during update:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
