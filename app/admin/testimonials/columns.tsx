// columns.tsx
'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";

async function updateTestimonial(id: string, data: any) {
  const res = await fetch("/api/testimonials", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    },
    body: JSON.stringify({ id, ...data }),
  });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.error || "Failed to update");
  }
}

async function deleteTestimonial(id: string) {
  const res = await fetch("/api/testimonials", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.error || "Failed to delete");
  }
}

export const columns: ColumnDef<any>[] = [
  {
    header: "User",
    accessorFn: (row) => row.user?.name || "Unknown",
  },
  {
    header: "Content",
    accessorKey: "content",
    cell: ({ row }) => (
      <p className="line-clamp-2">{row.original.content}</p>
    ),
  },
  {
    header: "Status",
    cell: ({ row }) => (
      <div className="flex gap-2">
        {row.original.approved && <Badge>Approved</Badge>}
        {row.original.featured && <Badge variant="secondary">Featured</Badge>}
      </div>
    ),
  },
  {
    header: "Date",
    accessorKey: "createdAt",
    cell: ({ row }) => format(new Date(row.original.createdAt), "PPP"),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={async () => {
              try {
                await updateTestimonial(id, { approved: true });
                toast.success("Approved");
              } catch {
                toast.error("Failed to approve");
              }
            }}
          >
            Approve
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={async () => {
              try {
                await updateTestimonial(id, { featured: true });
                toast.success("Marked as featured");
              } catch {
                toast.error("Failed to feature");
              }
            }}
          >
            Feature
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={async () => {
              try {
                await deleteTestimonial(id);
                toast.success("Deleted");
              } catch {
                toast.error("Failed to delete");
              }
            }}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
