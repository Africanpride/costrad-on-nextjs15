// AnnouncementActionsCell.tsx
"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type AnnouncementActionsCellProps = {
  id: string;
  approved: boolean;
  featured: boolean;
};

export function AnnouncementActionsCell({ id, approved, featured }: AnnouncementActionsCellProps) {
  const router = useRouter();

  const updateAnnouncement = async (data: any) => {
    const res = await fetch("/api/announcements", {
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

  const deleteAnnouncement = async () => {
    const res = await fetch("/api/announcements", {
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
    <div className="flex gap-2 flex-wrap ">
      <Button
        size="sm"
        variant={approved ? "outline" : "default"}
        onClick={async () => {
          try {
            await updateAnnouncement({ approved: !approved });
            toast.success(approved ? "Unapproved" : "Approved");
            router.refresh();
          } catch {
            toast.error("Failed to toggle approval");
          }
        }}
      >
        {approved ? "Unapprove" : "Approve"}
      </Button>

      <Button
        size="sm"
        variant={featured ? "outline" : "secondary"}
        onClick={async () => {
          try {
            await updateAnnouncement({ featured: !featured });
            toast.success(featured ? "Unfeatured" : "Featured");
            router.refresh();
          } catch {
            toast.error("Failed to toggle featured");
          }
        }}
      >
        {featured ? "Unfeature" : "Feature"}
      </Button>

      <Button
        size="sm"
        variant="destructive"
        onClick={async () => {
          try {
            await deleteAnnouncement();
            toast.success("Deleted");
            router.refresh();
          } catch {
            toast.error("Failed to delete");
          }
        }}
      >
        Delete
      </Button>
    </div>
  );
}
