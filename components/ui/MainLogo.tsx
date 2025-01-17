import { bebas } from '@/config/fonts';
import { Divider } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {};

const MainLogo = (props: Props) => {
    return (
        <Link
            href={'/'}
            className={`text-[1.2em] leading-[1em] flex h-5 items-center space-x-2 text-medium`}
        >
            <Image
                src={'/images/costrad.png'}
                alt='The Strategic Voter'
                height={50}
                width={50}
                style={{ width: 'auto', height: 'auto' }}
            />
            <Divider orientation='vertical' className='bg-gray-300' />
            <span
                className={`${bebas.className} text-gray-300`}
                // style={{
                //     background: 'linear-gradient(45deg, #ff0000, #0000ff)', // Replace with your desired gradient or background
                //     WebkitBackgroundClip: 'text',
                //     WebkitTextFillColor: 'transparent',
                // }}
            >
                The <br /> Strategic <br /> Voter
            </span>
        </Link>
    );
};

export default MainLogo;
