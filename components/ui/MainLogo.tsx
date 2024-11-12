import { bebas, playfair_display } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'

type Props = {}

const MainLogo = (props: Props) => {
    return (
        <>
            <Link href={'/'} className={`md:text-[1.7em] text-white ${playfair_display.className}`}>
                The Strategic Voter
            </Link>

        </>
    )
}

export default MainLogo