'use client';

import Start from '@/components/Start';
import CTA from '@/components/ui/CTA';
import Newsletter from '@/components/ui/Newsletter';
import Stage1 from '@/components/ui/Stage1';

export default function Home() {
  return (
    <main className='overflow-x-hidden '>
      <Start />
      <Stage1 />
      <CTA />
      <Newsletter />
    </main>
  );
}
