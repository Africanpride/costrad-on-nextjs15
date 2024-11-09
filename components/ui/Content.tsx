'use client';
import Link from 'next/link';
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { menuItems, siteConfig } from '../../config/site';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Marquee from './marquee';
import { motion } from 'framer-motion';

export default function Content() {
  return (
    <div className='bg-[#4E4E5A] py-8 px-12  h-full w-full flex flex-col justify-between'>
      <Nav />
      <Section2 />
    </div>
  );
}

const Section2 = () => {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  const directionRef = useRef(-1);

  const animate = useCallback(() => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -97;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * directionRef.current;
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (directionRef.current = e.direction * -1),
      },
      x: '-500px',
    });
    requestAnimationFrame(animate);
  }, [animate]);

  return (
    <div className='flex justify-between items-end relative '>
      {/* <div className='landing'>
                <div className="slidercontainer ">
                    <div ref={slider} className="slider">
                        <p ref={firstText}>The Strategic Voter -</p>
                        <p ref={secondText}>The Strategic Voter -</p>
                    </div>
                </div>
            </div> */}
      <div className='text-[15vw] leading-[0.8] mt-10 absolute -left-14 bottom-5 '>
        <div className='w-full opacity-20'>
          <Marquee className=' ' speed={70}>
            <p ref={firstText}> The Strategic Voter &#x2014; </p>
            <p ref={secondText}> The Strategic Voter &#x2014; </p>
          </Marquee>
        </div>
      </div>
      <div className='w-full md:flex items-center justify-between'>
        <div>
          <Link href={'/'}>
            {siteConfig.year} &copy; copyright &#x2014; All Rights Reserved.
          </Link>
        </div>
        <div className='flex items-center gap-10'>
          <Link href={'/'}>LinkedIn</Link>
          <Link href={'/'}>Facebook</Link>
          <Link href={'/'}>X</Link>
        </div>
      </div>
    </div>
  );
};

const Nav = () => {
  return (
    <div className='flex items-start shrink-0 gap-20 z-50'>
      <div className='flex flex-col'>
        <h3 className='mb-2 uppercase text-[#ffffff80]'>About</h3>
        {menuItems.map((item) => (
          <div key={item.number}>
            {/* <span className='absolute -left-8 text-sm text-zinc-600'>
                    {item.number}
                  </span> */}
            <Link
              href={item.href}
              className='group relative  font-light text-white transition-all duration-300'>
              {item.label}
              <span className='absolute -bottom-2 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full' />
            </Link>
          </div>
        ))}
      </div>
      <div className='flex flex-col'>
        <h3 className='mb-2 uppercase text-[#ffffff80]'>Affiliations</h3>
        <Link href={'http://www.costrad.org'} target='_blank'>
          COSTrAD
        </Link>
        <Link href={'https://gapnetwork.org'} target='_blank'>
          Gapnet
        </Link>
        <Link href={'https://www.logosrhema.org'} target='_blank'>
          Logos-Rhema Foundation
        </Link>
      </div>
    </div>
  );
};
