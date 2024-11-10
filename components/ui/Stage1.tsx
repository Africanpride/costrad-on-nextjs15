import { specialElite } from '@/config/fonts';
import Image from 'next/image';
import React from 'react';

type Props = {};

const Stage1 = (props: Props) => {
  return (
    <section className={`${specialElite.className} h-auto md:h-dvh p-16 flex flex-col justify-center items-center 
     dark:bg-neutral-950  `}>
      <div>
        <blockquote className='max-w-4xl container mx-auto text-xl md:text-4xl  ' >
          Ask that He will show you how to carry the responsibility of strategic
          voting with the weightiness and gravity it requires for your own good
          and the good of your territory.
        </blockquote>
        <cite className='text-xl pt-6'>&mdash; Dr. Abu Bako</cite>
      </div>
    </section>
  );
};

export default Stage1;
