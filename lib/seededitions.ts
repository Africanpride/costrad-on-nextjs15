import { prisma } from "@/prisma/dbConnect";
import editionData from "@/data/edition_mongo.json"; // adjust path as needed

export async function seedEditions() {
  for (const rawEdition of editionData) {
    const edition = {
      ...rawEdition,
      // Convert date strings to real Date objects
      startDate: rawEdition.startDate ? new Date(rawEdition.startDate) : undefined,
      endDate: rawEdition.endDate ? new Date(rawEdition.endDate) : undefined,
      createdAt: rawEdition.created_at ? new Date(rawEdition.created_at) : new Date(),
      updatedAt: rawEdition.updated_at ? new Date(rawEdition.updated_at) : new Date(),

      // Convert field name to match Prisma schema
      instituteId: rawEdition.institute_id?.toString(),

      // Ensure optional fields are not undefined
      theme: rawEdition.theme ?? '',
      introduction: rawEdition.introduction ?? '',
      banner: rawEdition.banner ?? '',
      seo: rawEdition.seo ?? '',
    };

    // Create or update the edition
    await prisma.edition.upsert({
      where: { slug: edition.slug },
      update: {},
      create: {
        id: edition.id,
        title: edition.title,
        slug: edition.slug,
        theme: edition.theme,
        acronym: edition.acronym,
        overview: edition.overview,
        about: edition.about,
        introduction: edition.introduction,
        banner: edition.banner,
        startDate: edition.startDate,
        endDate: edition.endDate,
        seo: edition.seo,
        active: edition.active ?? true,
        price: edition.price,
        createdAt: edition.createdAt,
        updatedAt: edition.updatedAt,
        instituteId: edition.instituteId,
      },
    });
  }

  console.log("✅ Editions seeded.");
}
