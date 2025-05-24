"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useState, useRef } from "react";
// LocomotiveScroll types are not exported directly, so define the options type inline
type ILocomotiveScrollOptions = {
  el: HTMLElement | null;
  smooth?: boolean;
  [key: string]: any;
};
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";




export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

interface ExtendedLocomotiveScrollOptions extends ILocomotiveScrollOptions {
  [key: string]: any;
}

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
      scrollInstancePromise.then((locomotiveScroll) => locomotiveScroll.destroy());
    };
  }, []);

  return (


    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider  {...themeProps}>
        <div ref={scrollContainerRef} data-scroll-container>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </div>
      </NextThemesProvider>
    </HeroUIProvider>

  );
}
