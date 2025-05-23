"use client";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import NextLink from "next/link";
import type { ReactNode, ReactElement } from "react";
import { useRouter } from "next/navigation";

import { client as authClient } from "@/lib/auth-client";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useState, useRef } from "react";
import { ILocomotiveScrollOptions } from "locomotive-scroll/dist/types/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

interface ExtendedLocomotiveScrollOptions extends ILocomotiveScrollOptions {
  [key: string]: any;
}

// Custom Link component to match AuthUIProvider's expected props
const AuthUILink = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}): ReactElement => (
  <NextLink href={href} className={className}>
    {children}
  </NextLink>
);

export function Providers({ children, themeProps }: ProvidersProps) {
  // Keep a single QueryClient instance for the entire lifespan of the app
  const [queryClient] = useState(() => new QueryClient());

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    async function initializeLocomotiveScroll() {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll({
        el: scrollContainerRef.current,
        smooth: true,
        autoResize: true,
      } as ExtendedLocomotiveScrollOptions);

      return locomotiveScroll;
    }

    const scrollInstancePromise = initializeLocomotiveScroll();

    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 2000);

    return () => {
      scrollInstancePromise.then((locomotiveScroll) =>
        locomotiveScroll.destroy()
      );
    };
  }, []);

  return (
    <AuthUIProvider
      basePath={process.env.NEXT_PUBLIC_BASE_URL}
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => {
        // Clear router cache (protected routes)
        router.refresh();
      }}
      Link={AuthUILink}
    >
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>
          <div ref={scrollContainerRef} data-scroll-container>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </div>
        </NextThemesProvider>
      </HeroUIProvider>
    </AuthUIProvider>
  );
}
