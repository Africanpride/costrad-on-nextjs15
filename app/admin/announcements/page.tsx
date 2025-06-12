// File: app/admin/announcement/page.tsx

import { prisma } from "@/prisma/dbConnect";
import { GenericDataTable } from "@/components/generic-data-table";
import { columns } from "./columns";

export default async function AdminAnnouncementPage() {
  const announcement = await prisma.testimonial.findMany({
    include: { user: true }
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">User Announcement</h1>
      <GenericDataTable columns={columns} data={announcement} />
    </div>
  );
}
