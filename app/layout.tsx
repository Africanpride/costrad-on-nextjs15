import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import { montserrat, oswald, playfair_display, plusJakartaSans } from '@/config/fonts';

import { Providers } from './providers';
import { siteConfig } from '@/config/site';
import StickyMenu from '@/components/ui/StickyMenu';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/images/costrad.png',
  },
  publisher: 'Dr. Abu Bako',
  robots: 'index, follow',
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
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html suppressHydrationWarning lang="en" 
    className={`${oswald.variable} ${montserrat.className } min-h-screen text-foreground bg-background antialiased`}
    >
      <head />
      <body>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          {/* Sticky Header Component */}
          <StickyMenu />
          <main className="relative overflow-x-hidden">
            {children}
            {/* <Footer /> */}
            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  );
}
