import { prisma } from "@/prisma/dbConnect";
import InstituteCardWithImage from "@/components/ui/InstituteCardWithImage";

export default async function InstituteComponent() {
  const institutes = await prisma.institute.findMany({
    include: {
      editions: {
        take: 1, // most recent edition (or adjust)
        orderBy: { startDate: "asc" },
      },
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4  gap-3 md:p-2">
      {institutes.map((institute) => {
        const edition = institute.editions[0];
        return (
          <InstituteCardWithImage
            key={institute.id}
            id={institute.id}
            name={institute.name}
            slug={institute.slug}
            overview={institute.overview}
            banner={institute.banner ?? "/images/default-banner.jpg"}
            logo={`/images/logos/${institute.acronym}.png`} // or use institute.logo
            editionTitle={edition?.title || "No Edition Available"}
            editionDates={
              edition?.startDate && edition?.endDate
                ? `${formatDate(edition.startDate)} – ${formatDate(edition.endDate)}`
                : "Dates TBD"
            }
          />
        );
      })}
    </div>
  );
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
