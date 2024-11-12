import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import { bebas, plusJakartaSans } from '@/config/fonts';

import { Providers } from './providers';

import { siteConfig } from '@/config/site';
import Footer from '@/components/ui/Footer';
import MainMenu from '@/components/ui/Menu';
import SlideInMenu from '@/components/SlideInMenu';
import MainLogo from '@/components/ui/MainLogo';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang='en'>
      <head />
      <body
        className={clsx(
          'min-h-screen light   text-foreground bg-background  antialiased',
          plusJakartaSans.className
        )}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <main className='relative overflow-x-hidden'>
            <div></div>
            <div className='fixed left-5 right-5 top-5 z-50 w-auto '>
              <div className='flex items-center justify-between'>              
                <SlideInMenu />
                <MainLogo />
                </div>
            </div>
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
