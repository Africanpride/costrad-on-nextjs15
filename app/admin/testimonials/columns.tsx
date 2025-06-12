// columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { ActionsCell } from "./ActionsCell";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "User",
    accessorFn: (row) => row.user?.name || "Unknown",
    cell: ({ row }) => (
      <Image
        src={row.original.user?.image || "/images/avatar.png"}
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
        <h5 className="font-bebas ">
          &mdash; {row.original.user?.name || "Unknown"}
        </h5>
      </div>
    ),
  },

  {
    header: "Date",
    accessorKey: "createdAt",
    cell: ({ row }) => format(new Date(row.original.createdAt), "PPP"),
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const testimonial = row.original;
      const id = testimonial.id;

      const updateTestimonial = async (data: any) => {
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
      };

      const deleteTestimonial = async () => {
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
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(testimonial.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                try {
                  await updateTestimonial({ approved: !approved });
                  toast.success(approved ? "Unapproved" : "Approved");
                  router.refresh();
                } catch {
                  toast.error("Failed to toggle approval");
                }
              }}
            >
              Aprove Testimonial
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  // {
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const { id, approved, featured } = row.original;
  //     return <ActionsCell id={id} approved={approved} featured={featured} />;
  //   },
  // },
];
