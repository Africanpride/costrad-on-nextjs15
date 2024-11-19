import { bebas, playfair_display, plusJakartaSans } from '@/config/fonts';
import { LucideMoveDown, LucideMove3d, LucideScale } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import MainMenu from './ui/Menu';
import Link from 'next/link';
import { Divider } from '@nextui-org/react';

type Props = {};

const Start = (props: Props) => {
  return (
    <section
      className={`${bebas.className} md:min-h-screen h-auto grid grid-cols-1 md:grid-cols-3 `}>
      <div
        className='bg-blue-950 col-span-1 md:col-span-2 min-h-dvh h-full flex flex-col
             justify-center md:justify-between items-start p-4 md:p-6 relative  order-2 '>
        <div></div>

        <div className='flex items-center justify-center max-w-4xl container mx-auto relative'>
          <Image
            src={'/images/globe.png'}
            alt='alt'
            width={400}
            height={400}
            style={{
              height: '25em',
              width: '25em',
            }}
            className=' animation-duration-100 animate-pulse absolute  '
          />
          <div
            className='text-xl md:text-5xl leading-[0.9em] text-white text-center'
            data-scroll
            data-scroll-speed={0.2}>
            <span>A profound exploration of the strategic thinking</span>
            <br />
            <span>behind informed voting decisions.</span>
          </div>
        </div>

        <div className='hidden md:block'>
          <LucideMoveDown className='animate-bounce w-6 h-6' />
        </div>
      </div>
      <div className='bg-yellow-700 min-h-dvh relative p-4 md:p-6 order-1 '>
        <div
          className='absolute inset-0 z-0'
          style={{
            backgroundImage: 'url("/images/abubako.jpg")',
            filter: 'contrast(118%) brightness(124%) saturate(2)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '100%',
            minHeight: '100%',
            width: '100%',
            minWidth: '100%',
            position: 'absolute',
          }}></div>

        <div className=' relative h-full flex flex-col justify-end items-start z-10'>
          <div data-scroll data-scroll-speed={0.1} className='space-y-4'>
            <div className='text-[3em] text-white'>
              <p className='leading-[0.9em] '>
                The <br />
                Strategic <br /> Voter{' '}
              </p>
            </div>
            <Divider className='my-4 w-2/5 bg-yellow-500 ' />
            <div className='text-yellow-500 '>
              <p className='text-lg'>
                THE KINGDOM PATTERNS SERIES &#x2014; VOLUME ONE
              </p>
              <p className={` text-sm  text-yellow-500 `}>
                &mdash; Authored By: Dr. Abu Bako
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Start;
