import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import { bebas, plusJakartaSans } from '@/config/fonts';

import { Providers } from './providers';

import { siteConfig } from '@/config/site';
import Footer from '@/components/ui/Footer';
import SlideInMenu from '@/components/SlideInMenu';
import MainLogo from '@/components/ui/MainLogo';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/images/favicon.png',
  },
  // keywords: siteConfig.keywords,
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
          'min-h-screen light  text-foreground bg-background  antialiased ',
          plusJakartaSans.className, bebas.variable
        )}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <main className='relative overflow-x-hidden'>
            <div></div>
            <div className='fixed px-2 w-full  top-5 z-50  '>
              <div className='flex items-center justify-between  p-4 rounded-full'>
                <MainLogo />
                <SlideInMenu />
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
