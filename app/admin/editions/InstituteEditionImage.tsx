"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface InstituteInfoProps {
  id: string;
}

interface Institute {
  name: string;
  logo?: string;
}

export function InstituteInfo({ id }: InstituteInfoProps) {
  const [institute, setInstitute] = useState<Institute | null>(null);

  useEffect(() => {
    async function fetchInstitute() {
      const res = await fetch(`/api/institutes/${id}`);
      if (res.ok) {
        const data = await res.json();
        setInstitute(data);
      }
    }

    if (id) {
      fetchInstitute();
    }
  }, [id]);

  if (!institute) {
    return (
      <div className="flex items-center gap-2">
        <Image
          src="/images/avatar.png"
          alt="Unknown"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Image
        src={institute.logo || "/images/avatar.png"}
        alt={institute.name}
        width={50}
        height={50}
        className="rounded-full"
      />
      <span>{institute.name}</span>
    </div>
  );
}
