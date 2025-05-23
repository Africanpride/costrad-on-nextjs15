"use client";
import { bebas, oswald } from "@/config/fonts";
import { Avatar, Divider } from "@heroui/react";
import Link from "next/link";

type MainLogoProps = {
  textColor?: string; // Accepts a tailwind class for text color
  logoSize?: string; // Accepts a tailwind class for logo size
  hideText?: boolean; // Accepts a boolean to hide text
};

const MainLogo = ({
  hideText = false,
  textColor = "text-purple-900 dark:text-purple-500",
  logoSize = "w-20 h-20",
}: MainLogoProps) => {
  return (
    <div className="flex h-auto  items-center space-x-3 sm:space-x-3 cursor-pointer ">
      <Link href={"/"}>
        <Avatar
          className={`${logoSize} text-large  `}
          src={"/images/costrad.png"}
        />
      </Link>
      {!hideText && (
        <div>
          {/* <Divider orientation='vertical' className='bg-gray-300' /> */}
          <div
            className={`${oswald.className} ${textColor} uppercase text-medium pl-3 border-left 
                    border-dotted border-l-indigo-500/50 dark:border-l-white/50 border-l-1  border-style-dotted                sm:leading-[1.2rem] font-light `}
          >
            College of Sustainable Transformation
            <br />
            And Development -{" "}
            <span className="normal-case font-medium">(COSTrAD)</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLogo;
