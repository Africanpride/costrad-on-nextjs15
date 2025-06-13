"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconPencilCog } from "@tabler/icons-react";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type InstituteForm = {
  id: string;
  overview: string;
  featured: boolean;
  approved: boolean;
};

interface EditInstituteSheetProps {
  institute: InstituteForm | null;
}

export default function EditInstituteSheet({
  institute,
}: EditInstituteSheetProps) {
  const router = useRouter();
  const [formState, setFormState] = useState<InstituteForm>({
    id: "",
    overview: "",
    featured: false,
    approved: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (institute) {
      setFormState(institute);
    }
  }, [institute]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/institutes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok)
        throw new Error((await res.json()).error || "Failed to update");

      toast.success("Institute updated!");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconPencilCog size={20} />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-full sm:max-w-lg p-4">
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <SheetHeader>
              <SheetTitle>Edit Institute</SheetTitle>
              <SheetDescription>
                Modify the fields below and click save.
              </SheetDescription>
            </SheetHeader>

            <div className="grid gap-4 py-4 flex-1 overflow-auto ">
              <div className="grid gap-3">
                <Label htmlFor="overview">Overview</Label>
                <Textarea
                  id="overview"
                  value={formState.overview}
                  onChange={(e) =>
                    setFormState((f) => ({ ...f, overview: e.target.value }))
                  }
                  required
                  className="h-[200px] font-opensans "
                />
              </div>

              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formState.featured}
                    onChange={(e) =>
                      setFormState((f) => ({
                        ...f,
                        featured: e.target.checked,
                      }))
                    }
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formState.approved}
                    onChange={(e) =>
                      setFormState((f) => ({
                        ...f,
                        approved: e.target.checked,
                      }))
                    }
                  />
                  Approved
                </label>
              </div>
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
