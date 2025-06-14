import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/prisma/dbConnect";

interface EditInstitutePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditInstitutePage(props: EditInstitutePageProps) {
  const params = await props.params;
  const institute = await prisma.institute.findUnique({
    where: { slug: params.slug },
  });

  if (!institute) return notFound();

  async function updateInstitute(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const acronym = formData.get("acronym") as string;
    const overview = formData.get("overview") as string;
    const about = formData.get("about") as string;

    await prisma.institute.update({
      where: { slug: params.slug },
      data: {
        name,
        acronym,
        overview,
        about,
      },
    });

    revalidatePath(`/admin/institutes/${params.slug}`);
    redirect(`/admin/institutes/${params.slug}`);
  }

  return (
    <form action={updateInstitute} className="space-y-6 p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Edit Institute: {institute.name}</h1>

      <div className="grid gap-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={institute.name}
            required
          />
        </div>

        <div>
          <Label htmlFor="acronym">Acronym</Label>
          <Input
            id="acronym"
            name="acronym"
            defaultValue={institute.acronym}
            required
          />
        </div>

        <div>
          <Label htmlFor="overview">Overview</Label>
          <Textarea
            id="overview"
            name="overview"
            defaultValue={institute.overview}
            required
            className="min-h-[150px]"
          />
        </div>

        <div>
          <Label htmlFor="about">About</Label>
          <Textarea
            id="about"
            name="about"
            defaultValue={institute.about}
            className="min-h-[150px]"
          />
        </div>
      </div>

      <Button type="submit">Save Changes</Button>
    </form>
  );
}
