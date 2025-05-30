"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { Divider } from "@heroui/react";
import { bebas } from "@/config/fonts";
import { LucideMoveDown } from "lucide-react";
import { useMediaQuery } from "react-responsive";

export const HeroSection: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Tailwind's `md` breakpoint

  return (
    <section
      className={`${bebas.className} md:min-h-screen h-auto grid grid-cols-1  `}
    >
      <div
        className="bg-purple-950 col-span-1 md:col-span-2 min-h-dvh h-full flex flex-col
                justify-center md:justify-between items-start p-4 md:p-6 relative  order-2 "
      >
        <div></div>

        <div className="flex items-center justify-center max-w-4xl container mx-auto relative">
          <Image
            src={"/images/globe.png"}
            priority
            alt="alt"
            width={400}
            height={400}
            style={{
              height: "25em",
              width: "25em",
            }}
            className=" animation-duration-100 animate-pulse absolute  "
          />
          <div
            className="text-xl md:text-5xl md:leading-[0.9em] text-white text-center"
            data-scroll
            data-scroll-speed={0.2}
          >
            <span>A profound exploration of the strategic thinking</span>
            <br />
            <span>behind informed voting decisions.</span>
          </div>
        </div>

        <div className="hidden md:block">
          <LucideMoveDown className="animate-bounce w-6 h-6" />
        </div>
      </div>
      <div className="bg-red-700 min-h-dvh relative p-4 md:p-6 order-1 ">
        <div
          className={clsx("absolute inset-0 z-0", {
            kenburns: !isMobile, // Add the animation only on non-mobile
          })}
          style={{
            backgroundImage: 'url("/images/united-nations.jpg")',
            filter: "contrast(118%) brightness(124%) saturate(2)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100%",
            minHeight: "100%",
            width: "100%",
            minWidth: "100%",
            position: "absolute",
          }}
        ></div>

        <div className=" relative h-full flex flex-col justify-end items-start z-10 ">
          <div
            data-scroll
            data-scroll-speed={0.1}
            className="space-y-4 bg-background p-4"
          >
            <div className="text-[3em] text-current">
              <p className="leading-[0.9em] ">
                Doing The
                <br />
                Seemingly Impossible{" "}
              </p>
            </div>
            <Separator className="my-4 w-2/5 h-2 bg-primary"  />

            <div className="text-red-500 ">
              <p className="text-lg">
                &mdash; Explore what COSTrAD can help you achieve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
