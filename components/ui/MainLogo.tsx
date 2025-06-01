"use client";
import { bebas, oswald } from "@/config/fonts";
import Image from "next/image";
import { Avatar, Divider } from "@heroui/react";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

type MainLogoProps = {
  textColor?: string; // Accepts a tailwind class for text color
  logoSize?: string; // Accepts a tailwind class for logo size
  hideText?: boolean; // Accepts a boolean to hide text
};

const MainLogo = ({
  hideText = false,
  textColor = " ",
  logoSize = " w-16 h-16  md:w-20 md:h-20 ",
}: MainLogoProps) => {
  return (
    <div className="flex h-auto  items-center space-x-3 sm:space-x-3 cursor-pointer ">
      <Link href="/" className="!opacity-100">
        <div className={`relative rounded-full overflow-hidden ${logoSize}`}>
          <Image
            src="/images/costrad.png"
            alt="COSTrAD"
            fill
            className="object-cover"
          />
        </div>
      </Link>

      {!hideText && (
        <Link href={"/"}>
          {/* <Divider orientation='vertical' className='bg-gray-300' /> */}
          <div
            className={`${oswald.className} ${textColor} uppercase text-[12px] md:text-sm pl-3 border-left 
                    border-dotted border-l-foreground/20  border-l-1  border-style-dotted           
                        sm:leading-[1.2rem] font-light `}
          >
            College of Sustainable Transformation
            <br />
            And Development -{" "}
            <span className="normal-case font-medium">(COSTrAD)</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default MainLogo;
