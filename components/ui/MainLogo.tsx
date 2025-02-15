"use client";
import { bebas, oswald } from '@/config/fonts';
import { Avatar, Divider } from "@heroui/react";
import Link from 'next/link';

type MainLogoProps = {
    textColor?: string; // Accepts a tailwind class for text color
    logoSize?: string; // Accepts a tailwind class for logo size
    hideText?: boolean; // Accepts a boolean to hide text
}

const MainLogo = ({ hideText = false, textColor = "text-purple-900 dark:text-purple-500", logoSize = "w-[3.2rem] h-[3.2rem]  sm:w-[5.4rem] sm:h-[5.4rem]" }: MainLogoProps) => {
    return (
        <Link
            href={'/'}
            className="flex h-3 sm:h-5 items-center space-x-1 sm:space-x-3 cursor-pointer"
        >
            <Avatar
                className={`${logoSize} text-large bg-purple-800 `}
                src={'/images/costrad.png'}
            />
            {!hideText && (
                <>
                    <Divider orientation='vertical' className='bg-gray-300' />
                    <span className={`${oswald.className} ${textColor} uppercase text-xs sm:text-medium
                        sm:leading-[1.2rem] font-light `}>
                        College of Sustainable  Transformation<br />
                        And Development - <span className='normal-case font-medium'>(COSTrAD)</span>
                    </span>
                </>
            )}
        </Link>
    );
};

export default MainLogo;
