"use client"; // This component needs to be a client component because it uses hooks

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
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


export function ActionsCellComponent({
  id,
  overview,
  featured,
  approved,
  setFormState,
  setIsEditing,
  openDialog,
}: ActionsCellProps) {
  const router = useRouter();

  const updateInstitute = async (data: any) => {
    const res = await fetch("/api/institutes", {
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

  const deleteInstitute = async () => {
    const res = await fetch("/api/institutes", {
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

  const handleEdit = () => {
    setFormState({ id, overview, featured: featured ?? false, approved: approved ?? false });
    setIsEditing(true);
    openDialog();
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
        <DropdownMenuSeparator />

       
        {/* Feature/Unfeature */}
        <DropdownMenuItem
          className="text-primary-foreground cursor-pointer"
          onClick={async () => {
            try {
              await updateInstitute({ featured: !featured });
              toast.success(
                featured ? "Institute Unfeatured!" : "Institute Featured!"
              );
              router.refresh();
            } catch (error: any) {
              toast.error(`Failed to toggle featured status: ${error.message}`);
            }
          }}
        >
          <span className="font-semibold">
            {featured ? "Unfeature" : "Feature"}
          </span>
        </DropdownMenuItem>

        {/* Approve/Unapprove */}
        <DropdownMenuItem
          className="text-firefly cursor-pointer"
          onClick={async () => {
            try {
              await updateInstitute({ approved: !approved });
              toast.success(
                approved ? "Institute Unapproved!" : "Institute Approved!"
              );
              router.refresh();
            } catch (error: any) {
              toast.error(`Failed to toggle approval status: ${error.message}`);
            }
          }}
        >
          <div className="font-semibold flex gap-2 items-center">
            {approved ? "Unapprove" : "Approve"}
          </div>
        </DropdownMenuItem>

        {/* Delete */}
        <DropdownMenuItem
          className="text-destructive cursor-pointer"
          onClick={async () => {
            try {
              await deleteInstitute();
              toast.success("Institute deleted successfully!");
              router.refresh();
            } catch (error: any) {
              toast.error(`Failed to delete institute: ${error.message}`);
            }
          }}
        >
          <span className="font-semibold">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
