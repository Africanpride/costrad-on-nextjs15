// columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { ActionsCell } from "./ActionsCell";



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
      <div className="space-y-2">
        <p className="whitespace-normal line-clamp-3 break-words text-sm max-w-[450px]">
          {row.original.content}
        </p>
        <h5 className="font-bebas ">&mdash; {row.original.user?.name || "Unknown"}</h5>
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
  {
    header: "Status",
    cell: ({ row }) => (
      <div className="flex gap-2">
        {row.original.approved && <Badge>Approved</Badge>}
        {row.original.featured && <Badge variant="secondary">Featured</Badge>}
      </div>
    ),
  },
];
