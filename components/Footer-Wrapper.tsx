"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // Definition of pages where StickyMenu should be hidden
  const hiddenPaths = ["/admin","/www","/coming-soon"];

  // Check if pathname starts with "/auth/" or is in hiddenPaths
  if (pathname.startsWith("/auth/") || hiddenPaths.includes(pathname)) {
    return null; // Hide StickyMenu
  }

  return <Footer />; // Render Footer if not hidden
}
