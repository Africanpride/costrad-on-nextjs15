// File: app/admin/testimonials/page.tsx

import { prisma } from "@/prisma/dbConnect";
import { DataTable } from "./data-table";
import { columns } from "./columns"

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    include: {
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">User Testimonials</h1>
      <DataTable columns={columns} data={testimonials} />
    </div>
  );
}
