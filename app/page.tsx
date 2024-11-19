'use client';

import Start from '@/components/Start';
import Preloader from '@/components/ui/animations/Preloader';
import BookIntro from '@/components/ui/BookIntro';
import CTA from '@/components/ui/CTA';
import Jumbotron from '@/components/ui/Jumbotron';
import Newsletter from '@/components/ui/Newsletter';
import Stage1 from '@/components/ui/Stage1';
import { AnimatePresence } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <main className='overflow-x-hidden '>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Start />
      <BookIntro />
      <Stage1 />
      <Jumbotron />
      <CTA />
      <Newsletter />
    </main>
  );
}
