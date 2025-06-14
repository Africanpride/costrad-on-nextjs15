"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SimpleEditorWithProps from "@/components/ui/TipTapEditor";
import { baseUrl } from "@/lib/metadata";

interface Institute {
  name: string;
  acronym: string;
  overview: string;
  about: string;
  slug: string;
}

export default function EditInstitutePage() {
  const router = useRouter();
  const params = useParams(); // Get dynamic route params
  const slug = params.slug as string; // Extract slug from URL
  const [loading, setLoading] = useState(false);
  const [institute, setInstitute] = useState<Institute | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) {
      setError(true);
      return;
    }

    async function fetchInstitute() {
      try {
        const response = await fetch(`${baseUrl}/api/institutes/${slug}`);
        if (!response.ok) {
          setError(true);
        } else {
          const data: Institute = await response.json();
          setInstitute(data);
        }
      } catch (err) {
        console.error("Failed to fetch institute", err);
        setError(true);
      }
    }

    fetchInstitute();
  }, [slug]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch(`/api/institutes/${slug}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      router.push(`/admin/institutes/${slug}`);
    } else {
      alert("Failed to update institute");
    }

    setLoading(false);
  }

  if (error) return <div className="p-6">Institute not found.</div>;
  if (!institute) return <div className="p-6">Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Edit Institute: {institute.name}</h1>
      <div className="grid gap-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={institute.name} required />
        </div>
        <div>
          <Label htmlFor="acronym">Acronym</Label>
          <Input id="acronym" name="acronym" defaultValue={institute.acronym} required />
        </div>
        <div>
          <Label htmlFor="overview">Overview</Label>
          <Textarea
            id="overview"
            name="overview"
            defaultValue={institute.overview}
            required
            className="min-h-[150px]"
          />
        </div>
        <div>
          <Label htmlFor="about">About</Label>
          <SimpleEditorWithProps initialContent={institute.about} fieldName="about" />
        </div>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}