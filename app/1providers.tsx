"use client"
 
import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import NextLink from "next/link"
import { useRouter } from "next/navigation"
import type { ReactNode, ReactElement } from "react"
 
import { client as authClient } from "@/lib/auth-client"

// Custom Link component to match AuthUIProvider's expected props
const AuthUILink = ({
    href,
    className,
    children,
}: {
    href: string
    className?: string
    children: ReactNode
}): ReactElement => (
    <NextLink href={href} className={className}>
        {children}
    </NextLink>
)
 
export function Providers({ children }: { children: ReactNode }) {
    const router = useRouter()
 
    return (
        <AuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={() => {
                // Clear router cache (protected routes)
                router.refresh()
            }}
            Link={AuthUILink}
        >
            {children}
        </AuthUIProvider>
    )
}