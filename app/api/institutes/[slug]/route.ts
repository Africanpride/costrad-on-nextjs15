import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/dbConnect";
import { revalidatePath } from "next/cache";
import { baseUrl } from "@/lib/metadata";

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
export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ slug: string }> }
) {
  console.log("IGNITION....PUT REQUEST");

  const params = await props.params;
  const slug = params.slug;

  try {
    const json = await request.json();

    // Only include non-null, non-undefined fields
    const fields = ["name", "acronym", "overview", "about", "introduction", "seo", "banner", "logo", "icon"];
    const data: Record<string, any> = {};

    for (const field of fields) {
      const value = json[field];
      if (value !== undefined && value !== null && value !== "") {
        data[field] = value;
      }
    }

    console.log("Sanitized update payload:", data);

    const updatedInstitute = await prisma.institute.update({
      where: { slug },
      data,
    });

    revalidatePath(`/admin/institutes/${slug}/edit`);

    return NextResponse.json(updatedInstitute);
  } catch (error: any) {
    console.error("Error updating institute:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Institute not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
