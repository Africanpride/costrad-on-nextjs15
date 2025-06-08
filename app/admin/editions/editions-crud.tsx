"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Institute {
  id: string;
  name: string;
  acronym: string;
}

interface Edition {
  id: string;
  instituteId: string;
  title: string;
  slug: string;
  theme: string;
  acronym: string;
  overview: string;
  about: string;
  introduction: string;
  banner: string;
  startDate: string;
  endDate: string;
  seo: string;
  active: boolean;
  price: string;
  updatedAt?: string;
}

export default function EditionsCrud() {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [form, setForm] = useState({
    instituteId: "",
    title: "",
    slug: "",
    theme: "",
    acronym: "",
    overview: "",
    about: "",
    introduction: "",
    banner: "",
    startDate: "",
    endDate: "",
    seo: "",
    active: true,
    price: "",
  });

  // Fetch institutes with authentication
  const fetchInstitutes = async () => {
    try {
      const res = await fetch("/api/institutes", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      console.log("Institutes fetched:", data); // Debug log
      setInstitutes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch institutes:", err);
      setError("Failed to fetch institutes");
      setInstitutes([]);
    }
  };

  // Fetch editions
  const fetchEditions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/editions", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      console.log("Editions fetched:", data); // Debug log
      setEditions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch editions:", err);
      setError("Failed to fetch editions");
      setEditions([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInstitutes();
    fetchEditions();
  }, []);

  // Add edition
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/editions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
      }
      setShowDialog(false);
      setForm({
        instituteId: "",
        title: "",
        slug: "",
        theme: "",
        acronym: "",
        overview: "",
        about: "",
        introduction: "",
        banner: "",
        startDate: "",
        endDate: "",
        seo: "",
        active: true,
        price: "",
      });
      fetchEditions();
    } catch (err) {
      console.error("Failed to add edition:", err);
      setError("Failed to add edition");
    }
    setLoading(false);
  };

  // Delete edition
  const handleDelete = async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/editions", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
      }
      fetchEditions();
    } catch (err) {
      console.error("Failed to delete edition:", err);
      setError("Failed to delete edition");
    }
    setLoading(false);
  };

  // Update edition (toggle active)
  const handleToggleActive = async (edition: Edition) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/editions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        },
        body: JSON.stringify({ ...edition, active: !edition.active }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
      }
      fetchEditions();
    } catch (err) {
      console.error("Failed to update edition:", err);
      setError("Failed to update edition");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Editions</h2>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => setShowDialog(true)}>Add Edition</Button>
          </DialogTrigger>
          <DialogContent className="w-screen" >
            <DialogHeader>
              <DialogTitle>Add Edition</DialogTitle>
              <DialogDescription>
                Fill in the details for the new edition.
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-2" onSubmit={handleAdd}>
              <Select              
                onValueChange={(value) =>
                  setForm((f) => ({ ...f, instituteId: value }))
                }
                value={form.instituteId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an institute" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Institutes</SelectLabel>
                    {loading ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : institutes.length > 0 ? (
                      institutes.map((institute) => (
                        <SelectItem key={institute.id} value={institute.id}>
                          {institute.name} ({institute.acronym})
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-data" disabled>
                        No institutes found
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <input
                required
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
              />
              <input
                required
                placeholder="Acronym"
                value={form.acronym}
                onChange={(e) =>
                  setForm((f) => ({ ...f, acronym: e.target.value }))
                }
              />
              <input
                required
                placeholder="Slug"
                value={form.slug}
                onChange={(e) =>
                  setForm((f) => ({ ...f, slug: e.target.value }))
                }
              />
              <input
                placeholder="Theme"
                value={form.theme}
                onChange={(e) =>
                  setForm((f) => ({ ...f, theme: e.target.value }))
                }
              />
              <input
                placeholder="Overview"
                value={form.overview}
                onChange={(e) =>
                  setForm((f) => ({ ...f, overview: e.target.value }))
                }
              />
              <input
                placeholder="About"
                value={form.about}
                onChange={(e) =>
                  setForm((f) => ({ ...f, about: e.target.value }))
                }
              />
              <input
                placeholder="Introduction"
                value={form.introduction}
                onChange={(e) =>
                  setForm((f) => ({ ...f, introduction: e.target.value }))
                }
              />
              <input
                placeholder="Banner"
                value={form.banner}
                onChange={(e) =>
                  setForm((f) => ({ ...f, banner: e.target.value }))
                }
              />
              <input
                type="date"
                placeholder="Start Date"
                value={form.startDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, startDate: e.target.value }))
                }
              />
              <input
                type="date"
                placeholder="End Date"
                value={form.endDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, endDate: e.target.value }))
                }
              />
              <input
                placeholder="SEO"
                value={form.seo}
                onChange={(e) =>
                  setForm((f) => ({ ...f, seo: e.target.value }))
                }
              />
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: e.target.value }))
                }
              />
              <div>
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, active: e.target.checked }))
                  }
                />
                <span> Active</span>
              </div>
              <Button
              className="w-1/2"
                type="submit"
                disabled={
                  loading ||
                  !form.instituteId ||
                  !form.title ||
                  !form.acronym ||
                  !form.slug
                }
              >
                {loading ? "Adding..." : "Add"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <DataTable
        data={editions.map((item: Edition) => ({
          id: Number(item.id), // Convert id to number
          header: item.title,
          type: item.acronym,
          status: item.active ? "Active" : "Inactive",
          target: item.slug,
          limit: item.price,
          reviewer: item.updatedAt
            ? new Date(item.updatedAt).toLocaleDateString()
            : "",
          institute: item.instituteId,
          theme: item.theme,
          about: item.about,
          introduction: item.introduction,
          banner: item.banner,
          startDate: item.startDate
            ? new Date(item.startDate).toLocaleDateString()
            : "",
          endDate: item.endDate
            ? new Date(item.endDate).toLocaleDateString()
            : "",
          seo: item.seo,
          actions: (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleToggleActive(item)}
                disabled={loading}
              >
                Toggle Active
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(item.id)}
                disabled={loading}
              >
                Delete
              </Button>
            </div>
          ),
        }))}
      />
    </div>
  );
}
