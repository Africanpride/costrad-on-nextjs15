"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { getBaseUrl } from "@/config/site";

export function ExtensionComponent() {
  const router = useRouter();
  const [overview, setOverview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${getBaseUrl()}/api/editions`, {
        method: "POST",
        headers: {
          "Overview-Type": "application/json",
        },
        body: JSON.stringify({ overview }), // ✅ match model field
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "Failed to create edition.");
      }

      toast.success("Edition created successfully!");
      setOverview(""); // reset form
      document.getElementById("dialog-close-btn")?.click();
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
