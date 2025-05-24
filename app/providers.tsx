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
        // el: scrollContainerRef.current,
        // smooth: true,
        autoResize: true,
      });

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
      signInSocial={async (provider: string) => {
        // Example: redirect to the provider's sign-in URL
        let url = "";
        if (provider === "google") {
          url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-in?provider=google`;
        } else if (provider === "github") {
          url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-in?provider=github`;
        }
        window.location.href = url;
        return Promise.resolve();
      }}
      twoFactor={["otp", "totp"]}
      settingsURL="/dashboard/settings" // Your custom settings route
      captcha={{
        provider: "google-recaptcha-v3",
        siteKey:`${process.env.RECAPTCHA_SECRET_KEY}`,
      }}
      rememberMe={true}
      emailVerification={true}
      credentials={true}
      providers={["google", "apple", "microsoft", "facebook"]}
      basePath={process.env.NEXT_PUBLIC_BASE_URL}
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => {
        // Clear router cache (protected routes)
        router.refresh();
      }}
      Link={AuthUILink}
      localization={{
        signIn: "Log in",
        signInDescription: "Use your email and password to log in.",
        signUp: "Create Account",
        forgotPassword: "Reset Password",
        emailPlaceholder: "your-email@example.com",
        passwordPlaceholder: "Secret password",
        magicLinkEmail: "Check your inbox for your login link!",
        forgotPasswordEmail: "Check your inbox for the password reset link.",
        resetPasswordSuccess: "You can now sign in with your new password!",
        changePasswordSuccess: "Your password has been successfully updated.",
        deleteAccountSuccess: "Your account has been permanently deleted.",
      }}
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
