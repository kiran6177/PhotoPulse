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
            <div className='bg-gradient-to-br from-[#c14ac3] via-[#5010a2] to-[#2003b0] rounded-full p-2 cursor-pointer'>
                <PiUserListFill onClick={()=>router.push("/profile")} className='w-[1.5rem] h-[1.5rem] invert ' />
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
