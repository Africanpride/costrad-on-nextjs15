"use client";

import Image from "next/image";
import React from "react";
import clsx from "clsx";
import { LucideMoveDown } from "lucide-react";
import { bebas } from "@/config/fonts";
import { useDevice } from "@/hooks/useDevice";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

interface WhyCostradProps {
  backgroundImageUrl?: string;
}

export const WhyCostrad: React.FC<WhyCostradProps> = ({
  backgroundImageUrl = "/images/united-nations.jpg",
}) => {
  const { isMobile } = useDevice();

  return (
    <section className="max-w-auto  mx-auto h-auto ">
      <div className="  md:py-8 ">
        <div className="px-4 mx-auto max-w-8xl sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-y-10 md:grid-cols-2 md:gap-x-6">
            <div className="relative grid grid-cols-2 gap-4 mt-10 md:mt-0 py-12 h-auto">
              <div className="overflow-hidden aspect-w-3 aspect-h-4 rounded-2xl">
                <Image
                  className="object-cover object-top origin-top scale-150 "
                  src="/images/leader2.jpg"
                  alt=""
                  width={400}
                  height={533}
                />
              </div>

              <div className="relative">
                <div className="h-full overflow-hidden aspect-w-3 aspect-h-4 rounded-2xl">
                  <Image
                    className="object-cover object-top origin-top scale-110"
                    src="/images/steps.jpg"
                    alt=""
                    width={400}
                    height={533}
                  />
                </div>
              </div>

              <div className="absolute -translate-x-1/2 left-[50%]  ">
                <Image
                  className="w-32 h-32 rotating"
                  src="/images/round-text-costrad.png"
                  alt=""
                  width={128}
                  height={128}
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col items-start justify-center md:px-8 space-y-6 text-left ">
              <h2 className="uppercase text-3xl md:text-5xl   ">
                The Vital Role of Leadership Training Today
              </h2>
              <p>
                At the{" "}
                <span>
                  College of Sustainable Transformation and Development COSTrAD
                </span>
                , You would find more reasons why leadership training is
                essential and how leadership impacts family, governance, economy
                and every aspect of society. We teach you the necessary skills
                and qualities to effectively lead and manage people,
                organizations, and systems. Leaders must possess strong
                communication, decision-making, and problem-solving skills, as
                well as the ability to inspire and motivate others.
              </p>

              <div className="mx-auto py-6 text-left w-full">
                <Link href="/institutes/college-of-sustainable-transformation-and-development">
                  {" "}
                  <button className="cbutton font-bold">
                    Learn More About costrad
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCostrad;
