"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getBaseUrl } from "@/config/site";
import { Button } from "@/components/ui/button";
import { UploadImage } from "@/components/custom/UploadImage";
import { InstituteCombobox } from "@/components/custom/Combobox";

type Institute = {
  id: string;
  name: string;
  logo?: string;
};

export function ExtensionComponent() {
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [selectedInstituteId, setSelectedInstituteId] = useState<string>("");

  useEffect(() => {
    fetch("/api/institutes")
      .then((res) => res.json())
      .then((data) => setInstitutes(data));
  }, []);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    instituteId: "",
    title: "",
    acronym: "",
    overview: "",
    about: "",
    introduction: "",
    seo: "",
    price: "",
    startDate: "",
    endDate: "",
    banner: "",
    verticalBanner: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${getBaseUrl()}/api/editions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          startDate: form.startDate ? new Date(form.startDate) : null,
          endDate: form.endDate ? new Date(form.endDate) : null,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "Failed to create edition.");
      }

      toast.success("Edition created successfully!");
      setForm({
        instituteId: "",
        title: "",
        acronym: "",
        overview: "",
        about: "",
        introduction: "",
        seo: "",
        price: "",
        startDate: "",
        endDate: "",
        banner: "",
        verticalBanner: "",
      });
      router.refresh();
    } catch (err) {
      if (err && typeof err === "object" && "message" in err) {
        toast.error(
          (err as { message: string }).message || "Something went wrong."
        );
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Add Edition</Button>
      </SheetTrigger>
      <SheetContent className="p-4 overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Add New Edition</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Institute</Label>
            <InstituteCombobox
              institutes={institutes}
              onSelect={(id) => setSelectedInstituteId(id)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input name="title" value={form.title} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label>Acronym</Label>
              <Input
                name="acronym"
                value={form.acronym}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Overview</Label>
            <Textarea
              name="overview"
              value={form.overview}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label>About</Label>
            <Textarea name="about" value={form.about} onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label>Introduction</Label>
            <Textarea
              name="introduction"
              value={form.introduction}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Start Date</Label>
              <Input
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label>End Date</Label>
              <Input
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>SEO</Label>
              <Input name="seo" value={form.seo} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label>Price</Label>
              <Input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <UploadImage
            label="Banner"
            onUpload={(url) => setForm((f) => ({ ...f, banner: url }))}
          />

          <UploadImage
            label="Vertical Banner"
            onUpload={(url) => setForm((f) => ({ ...f, verticalBanner: url }))}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Edition"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
