import React from 'react'

function FullButton({styles,title,clickHandler,type}) {
  return (
      <button type={type} onClick={clickHandler} className={`tracking-widest  bg-gradient-to-br from-[#5c245d] via-[#501f91] to-[#2003b0] rounded-sm text-sm py-2   w-full ${styles}`}>{title}</button>
  )
}

export default FullButton
