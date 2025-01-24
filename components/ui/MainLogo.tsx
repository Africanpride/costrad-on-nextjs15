"use client";
import { bebas, oswald } from '@/config/fonts';
import { Avatar, Divider } from "@heroui/react";
import Link from 'next/link';

type MainLogoProps = {
    textColor?: string; // Accepts a tailwind class for text color
    logoSize?: string; // Accepts a tailwind class for logo size
}

const MainLogo = ({ textColor = "text-purple-900 dark:text-purple-500", logoSize = "w-[5.4rem] h-[5.4rem]" }: MainLogoProps) => {
    return (
        <Link
            href={'/'}
            className="text-[1rem] leading-[1.2rem] font-normal flex h-5 items-center space-x-3 cursor-pointer"
        >
            <Avatar
                className={`${logoSize} text-large bg-purple-800 `}
                src={'/images/costrad.png'}
            />
            <Divider orientation='vertical' className='bg-gray-300' />
            <span className={`${oswald.className} ${textColor} uppercase`}>
                College of Sustainable  Transformation<br /> 
                And Development - <span className='normal-case'>(COSTrAD)</span>
            </span>
        </Link>
    );
};

export default MainLogo;
