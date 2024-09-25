import { montserrat } from '@/fonts'
import React from 'react'
import BorderLink from './BorderLink'
import Link from 'next/link'

function Header() {
  return (
    <div className='flex justify-between  h-[5rem] items-center px-8'>
      <div>
        <Link href={"/"}><h1 className={`${montserrat.className} antialiased text-3xl font-bold bg-gradient-to-r from-[#c14ac3] via-[#5010a2] to-[#2003b0] bg-clip-text text-transparent`}>PhotoPulse</h1></Link>
      </div>
      <div className='flex gap-5'>
        <BorderLink title={"LOGIN"} href={"/login"} />
        <BorderLink title={"SIGNUP"} href={"/signup"} />
      </div>
    </div>
  )
}

export default Header
