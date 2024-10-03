import React from "react";
import Link from 'next/link'

function BorderLink({ title, styles, href }) {
  return (
    <div className="bg-gradient-to-r from-[#c14ac3] via-[#5010a2] to-[#2003b0] p-[2px] inline-block rounded-full">
      <div className="bg-black h-full rounded-full flex items-center">
        <Link
          className=" text-white  px-4 py-[6px] tracking-widest text-[10px] sm:text-xs"
          href={href}
        >
          {title}
        </Link>
      </div>
    </div>
  );
}

export default BorderLink;
