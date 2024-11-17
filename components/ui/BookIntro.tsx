import { bebas } from '@/config/fonts';
import Link from 'next/link';
import React from 'react';

type Props = {};

const BookIntro = (props: Props) => {
  return (
    <section className=''>
      <div className='max-w-full overflow-hidden border-y border-border bg-accent px-4 pt-10 md:pt-16 lg:pt-20'>
        <div className='container mx-auto relative flex flex-col md:flex-row md:space-x-12'>
          <div className='mb-72 md:mb-28 md:w-2/3 lg:shrink-0 xl:mb-20 xl:w-1/2 flex flex-col justify-center'>
            <h3
              className={`${bebas.className} mb-3 text-4xl font-semibold md:mb-4 md:text-5xl lg:mb-6`}>
              Discover the Power of Strategic Voting
            </h3>
            <p className='mb-8 text-foreground lg:text-lg'>
              The Strategic Voter isn’t just a book; it’s a guide to
              reclaiming your authority as a co-ruler of governance under God's
              principles. Learn how every decision at the ballot shapes the
              future of your nation, your generation, and your legacy. Equip
              yourself with the wisdom to vote strategically and ensure that
              leadership aligns with the values and vision that transform
              societies. Don’t just vote—vote with purpose, precision, and
              divine insight.
            </p>
            <Link href={'/the-book'} type="button" className="py-4 px-6  bg-neutral-600 hover:bg-neutral-700 focus:ring-neutral-500 focus:ring-offset-neutral-200 text-white w-full md:w-2/4  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              Find Out More ...
            </Link>
          </div>

          <div className='absolute bottom-0 right-1/2 mr-6 h-min w-[110%] max-w-md translate-x-1/2 md:-right-36 md:mr-0 md:w-3/4 md:max-w-xl md:translate-x-0 lg:mt-auto xl:relative xl:right-0 xl:size-full xl:max-w-full'>
            <div className='relative aspect-[8/5] size-full min-h-64'>
              <div className='absolute right-0 top-0 z-40 flex aspect-[3/5] w-3/5 -translate-x-[24%] translate-y-[24%] -rotate-[30deg] justify-center text-clip rounded-3xl bg-background shadow-lg shadow-foreground/20 md:max-xl:-translate-x-[8%] md:max-xl:translate-y-[16%]' />
              <div className='absolute right-0 top-0 z-40 flex aspect-[3/5] w-3/5 -translate-x-[16%] translate-y-[8%] -rotate-[15deg] justify-center text-clip rounded-3xl bg-background shadow-xl shadow-foreground/20 md:max-xl:-translate-x-[6%] md:max-xl:translate-y-[6%]' />
              <div className='absolute right-0 top-0 z-40 flex aspect-[3/5] w-3/5 items-center justify-center text-clip rounded-3xl bg-background shadow-2xl shadow-foreground/20' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookIntro;
