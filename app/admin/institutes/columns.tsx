// columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionsCellComponent } from "./ActionsCellComponent";
import { BadgeCheckIcon } from "lucide-react";
import EditInstituteDialog from "./EditInstituteDialogue";
import { Edition } from "@prisma/client";

// Updated Institute type with missing fields
type Institute = {
  id: string;
  name: string;
  acronym: string;
  overview: string;
  about: string;
  introduction: string;
  icon?: string | null;
  logo?: string | null;
  banner?: string | null;
  seo?: string | null;
  active: boolean;
  slug: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  approved?: boolean; // Added
  featured?: boolean; // Added
  editions: Edition[] | null;
};

// Define type for ActionsCellComponent props (for type safety)
interface ActionsCellProps {
  id: string;
  overview: string; // Changed from content to overview
  featured?: boolean;
  approved?: boolean;
  setFormState: (state: {
    id?: string;
    overview?: string;
    featured: boolean;
    approved: boolean;
  }) => void;
  setIsEditing: (editing: boolean) => void;
  openDialog: () => void;
}

export const columns: ColumnDef<Institute>[] = [
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
    id: "logo",
    header: "Logo",
    accessorFn: (row) => row.logo || "No Logo",
    cell: ({ row }) => (
      <Image
        src={`/${row.original.logo}` || "/images/avatar.png"}
        alt={row.original.name || "Institute logo"}
        width={80}
        height={80}
        className="rounded-full"
      />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "overview",
    header: "Overview",
    accessorKey: "overview",
    cell: ({ row }) => (
      <div className="space-y-2">
        <p className="whitespace-normal line-clamp-3 break-words text-sm max-w-[450px]">
          {row.original.overview}
        </p>
        <h5 className="font-bebas">— {row.original.name || "Unknown"}</h5>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "createdAt",
    header: "Date",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const dateValue = row.original.createdAt;
      if (dateValue && !isNaN(new Date(dateValue).getTime())) {
        return format(new Date(dateValue), "PPP");
      }
      return "N/A";
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex gap-2">
        {row.original.approved && (
          <Badge
            variant="secondary"
            className="bg-green-500 text-white dark:bg-green-600"
          >
            <BadgeCheckIcon />
            Approved
          </Badge>
        )}
        {row.original.featured && (
          <Badge
            variant="secondary"
            className="bg-yellow-500 text-white dark:bg-yellow-600"
          >
            <BadgeCheckIcon />
            Featured
          </Badge>
        )}
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const institute = row.original;
      // Ensure 'featured' and 'approved' are always boolean
      const instituteForm = {
        ...institute,
        featured: institute.featured ?? false,
        approved: institute.approved ?? false,
      };
      return (

        <EditInstituteDialog institute={instituteForm} />
      )
  },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const institute = row.original;
      return (
        <ActionsCellComponent
          id={institute.id}
          overview={institute.overview} // Changed from content
          featured={institute.featured ?? false}
          approved={institute.approved ?? false}
          setFormState={(state) => {
            console.log("setFormState:", state); // Replace with actual implementation
          }}
          setIsEditing={(editing) => {
            console.log("setIsEditing:", editing); // Replace with actual implementation
          }}
          openDialog={() => {
            console.log("openDialog triggered"); // Replace with actual implementation
          }}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];