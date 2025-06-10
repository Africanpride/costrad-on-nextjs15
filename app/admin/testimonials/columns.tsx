// columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ActionsCell } from "./ActionsCell";

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
    cell: ({ row }) => (
      <Image
        src={row.original.user?.image || "/default-user.png"}
        alt={row.original.user?.name || "Unknown user"}
        width={50}
        height={50}
        className="rounded-full"
      />
    ),
  },
  {
    header: "Content",
    accessorKey: "content",
    cell: ({ row }) => (
      <p className="whitespace-normal line-clamp-3 break-words text-sm max-w-[300px]">
        {row.original.content}
      </p>
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
      const { id, approved, featured } = row.original;
      return <ActionsCell id={id} approved={approved} featured={featured} />;
    },
  },
];
