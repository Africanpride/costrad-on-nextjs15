"use client"
import { bebas, oswald } from '@/config/fonts';
import { Avatar, Divider } from "@heroui/react";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {};

const MainLogo = (props: Props) => {
    return (
        <Link
            href={'/'}
            className={`text-[1rem] leading-[1.2rem] font-normal flex h-5 items-center space-x-3 cursor-pointer`}
        >
            <Avatar
                className="w-[5.4rem] h-[5.4rem] text-large bg-purple-800 "
                src={'/images/costrad.png'}
            />
            <Divider orientation='vertical' className='bg-gray-300' />
            <span
                className={`${oswald.className} text-purple-900 dark:text-purple-500 uppercase `}
            // style={{
            //     background: 'linear-gradient(45deg, #ff0000, #0000ff)', // Replace with your desired gradient or background
            //     WebkitBackgroundClip: 'text',
            //     WebkitTextFillColor: 'transparent',
            // }}
            >
                College of Sustainable  Transformation<br /> And Development - <span className='normal-case '>(COSTrAD)</span>
            </span>
        </Link>
    );
};

export default MainLogo;
