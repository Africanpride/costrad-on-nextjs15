import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import { montserrat, playfair_display } from '@/config/fonts';

import { Providers } from './providers';
import { siteConfig } from '@/config/site';
import Footer from '@/components/ui/Footer';
import StickyMenu from '@/components/ui/StickyMenu';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx('min-h-screen text-foreground bg-background antialiased', montserrat.className, playfair_display.variable)}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <main className="relative overflow-x-hidden">
            {/* Sticky Header Component */}
            <StickyMenu />
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
