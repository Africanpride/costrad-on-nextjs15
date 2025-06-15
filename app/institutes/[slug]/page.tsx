// app/institutes/[slug]/page.tsx
import { prisma } from '@/prisma/dbConnect';

export default async function InstituteViewPage({ params }: { params: { slug: string } }) {

    console.log(params.slug);
  const inst = await prisma.institute.findUnique({
    where: { id: params.slug },
    select: { name: true },
  });
  if (!inst) return <div>Not found</div>;
  return <h1>{inst.name}</h1>;
}
