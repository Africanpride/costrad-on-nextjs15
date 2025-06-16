"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function UploadImage({
  label,
  onUpload,
}: {
  label: string;
  onUpload: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // replace with your actual preset

    const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    onUpload(data.secure_url);
    setUploading(false);
  };

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
    </div>
  );
}
