import { montserrat } from '@/fonts'
import React from 'react'
import Link from 'next/link'
import NavRight from './NavRight'

function Header() {
  return (
    <div className='flex justify-between  h-[5rem] items-center px-8 fixed w-screen bg-black z-20'>
      <div>
        <Link href={"/"}><h1 className={`${montserrat.className} antialiased text-3xl font-bold bg-gradient-to-r from-[#c14ac3] via-[#5010a2] to-[#2003b0] bg-clip-text text-transparent`}>PhotoPulse</h1></Link>
      </div>
      <NavRight/>
    </div>
  )
}

export default Header
