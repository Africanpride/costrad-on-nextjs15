"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface JumbotronProps {
  heroImage?: string;
  height?: string;
}

export default function Jumbotron({ 
  heroImage = "vote.jpg",
  height = 'md:h-[400px]'
}: JumbotronProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative w-full">
      {/* Main container */}
      <div className="md:min-w-[1440px] mx-auto">
        {/* Navigation bar */}


        {/* Hero Image Section */}
        <div className={`relative w-full h-[400px] ${height}  overflow-hidden`}>
          <Image
            src={`/images/${heroImage}`}
            alt="Today at Apple Hero"
            fill={true}
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 1440px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30"></div>
        </div>

        {/* Mobile Navigation Menu */}
        {/* <div className={`${isMenuOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden`}>
          <div className="px-4 py-2 space-y-2">
            <Link 
              href="#" 
              className="block px-3 py-2 rounded-md text-base text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors"
            >
              Discover
            </Link>
            <Link 
              href="#" 
              className="block px-3 py-2 rounded-md text-base text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors"
            >
              Calendar
            </Link>
            <Link 
              href="#" 
              className="block px-3 py-2 rounded-md text-base text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors"
            >
              Groups
            </Link>
          </div>
        </div> */}
      </div>
    </header>
  )
}