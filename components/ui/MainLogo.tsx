import { bebas, playfair_display } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'

type Props = {}

const MainLogo = (props: Props) => {
    return (
        <>
            <Link href={'/'} className={`text-lg md:text-[2.7em] shadow-sm text-yellow-500 ${playfair_display.className}`}>
                The Strategic Voter
            </Link>

        </>
    )
}

export default MainLogo