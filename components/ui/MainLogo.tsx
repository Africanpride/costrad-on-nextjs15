"use client"
import { bebas } from '@/config/fonts';
import { Avatar, Divider } from "@heroui/react";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {};

const MainLogo = (props: Props) => {
    return (
        <Link
            href={'/'}
            className={`text-[1rem] leading-[1em] flex h-5 items-center space-x-3 cursor-pointer`}
        >
            <Avatar
                className="w-[5.4rem] h-[5.4rem] text-large"
                src={'/images/costrad.png'}
            />
            <Divider orientation='vertical' className='bg-gray-300' />
            <span
                className={`${bebas.className} text-purple-900 dark:text-purple-500`}
            // style={{
            //     background: 'linear-gradient(45deg, #ff0000, #0000ff)', // Replace with your desired gradient or background
            //     WebkitBackgroundClip: 'text',
            //     WebkitTextFillColor: 'transparent',
            // }}
            >
                College of Sustainable  Transformation<br /> And Development - (COSTrAD)
            </span>
        </Link>
    );
};

export default MainLogo;
