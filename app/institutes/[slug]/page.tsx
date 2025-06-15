// app/institutes/[slug]/page.tsx
import { prisma } from "@/prisma/dbConnect";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section1 } from "../Section1";

// Static paths for SSG
export async function generateStaticParams() {
  const institutes = await prisma.institute.findMany({
    select: { slug: true },
  });

  return institutes.map((institute) => ({
    slug: institute.slug,
  }));
}

// SEO metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const institute = await prisma.institute.findUnique({
    where: { slug: params.slug },
    select: { name: true },
  });

  return {
    title: institute?.name || "Institute Not Found",
  };
}

// Actual SSG Page
export default async function InstituteViewPage({
  params,
}: {
  params: { slug: string };
}) {
  const institute = await prisma.institute.findUnique({
    where: { slug: params.slug },
    include: {
      editions: true,
    },
  });

  if (!institute) return notFound();

  return (
    <div className="overflow-hidden">
      <Section1
        name={institute.name}
        overview={institute.overview}
        edition={
          institute.editions[0]
            ? {
                title: institute.editions[0].title,
                startDate: institute.editions[0].startDate ?? undefined,
                endDate: institute.editions[0].endDate ?? undefined,
                banner: institute.editions[0].banner ?? undefined,
              }
            : undefined
        }
      />
    </div>
  );
}
