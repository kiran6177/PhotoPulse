"use client"
import React, { useEffect } from 'react'

function Error({error,reset}) {
    useEffect(()=>{
        console.log("HIT",error);
    },[error])

  return (
    <div className='pt-[8rem] px-8'>
      <h2 className='text-white'>ERROR</h2>
    </div>
  )
}

export default Error
