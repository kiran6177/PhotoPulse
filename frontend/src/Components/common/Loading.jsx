import React from 'react'
import { BounceLoader } from 'react-spinners'

function Loading() {
  return (
    <div className='w-full min-h-screen flex justify-center items-center ' ><BounceLoader color={'#c641fa'} /></div>
  )
}

export default Loading
