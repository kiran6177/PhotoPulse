"use client"
import React from 'react'
import BorderLink from './BorderLink'
import { useAuth } from '@/context/AuthContext'
import { PiUserListFill } from "react-icons/pi";
import { useRouter } from 'next/navigation';

function NavRight() {
    const {user,loading} = useAuth();
    const router = useRouter();

  return (
    !loading &&
    <div className='flex gap-5'>
        {
            user ?
            <div onClick={()=>router.push("/profile")} className='bg-gradient-to-br flex items-center gap-3 px-4 from-[#c14ac3] via-[#5010a2] to-[#2003b0] rounded-full py-2 cursor-pointer'>
                <PiUserListFill  className='w-[1.5rem] h-[1.5rem] invert ' />
                <p className='text-xs text-white'>{user?.name}</p>
            </div>
            :
            <>
            <BorderLink title={"LOGIN"} href={"/login"} />
            <BorderLink title={"SIGNUP"} href={"/signup"} />
            </>
        }
      </div>
  )
}

export default NavRight
