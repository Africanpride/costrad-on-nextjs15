import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { bebas, montserrat, oswald } from "@/config/fonts";

import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import StickyMenuWrapper from "@/components/ui/StickyMenuWrapper"; // Import wrapper
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/images/costrad.png",
  },
  publisher: "Dr. Abu Bako",
  robots: "index, follow",
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${oswald.variable} ${bebas.variable} ${montserrat.className} min-h-screen text-foreground bg-background antialiased`}
    >
      <head />
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          {/* Use the wrapper component instead */}
          <StickyMenuWrapper />
          <main className="relative overflow-x-hidden">
            {children}
            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  );
}
