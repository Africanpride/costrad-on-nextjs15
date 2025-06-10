"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface JumbotronProps {
  heroImage?: string;
  height?: string;
  shade?: string;
  className?: string;
}

export default function Jumbotron({ 
  heroImage = "center.jpg",
  height = 'md:h-[500px]',
  shade = '30',
  className
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
            alt="COSTrAD"
            fill={true}
            priority
            className={`object-cover kenburns  ${className}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 1440px"
          />
          <div className={`absolute inset-0 bg-black/${shade}`}></div>
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