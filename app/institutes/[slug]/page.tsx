// app/institutes/[slug]/page.tsx
import { prisma } from '@/prisma/dbConnect';

export default async function InstituteViewPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  console.log(params.slug);
  const inst = await prisma.institute.findUnique({
    where: { slug: params.slug },
    select: { name: true },
  });
  if (!inst) return <div>Not found</div>;
  return <h1>{inst.name}</h1>;
}
