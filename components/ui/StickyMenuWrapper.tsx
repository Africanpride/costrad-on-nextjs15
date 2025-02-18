"use client";

import { usePathname } from "next/navigation";
import StickyMenu from "./StickyMenu";

export default function StickyMenuWrapper() {
  const pathname = usePathname();

  // Definition of pages where StickyMenu should be hidden
  const hiddenPaths = ["/admin"];

  // Check if pathname starts with "/auth/" or is in hiddenPaths
  if (pathname.startsWith("/auth/") || hiddenPaths.includes(pathname)) {
    return null; // Hide StickyMenu
  }

  return <StickyMenu />;
}
