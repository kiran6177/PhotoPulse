"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function CategoryBox({category}) {
  const router = useRouter();
  return (
    <div onClick={()=>router.push(`/category/${category?._id}`)} className="rounded-md max-w-[20%] min-w-[290px] relative min-h-[8rem] overflow-hidden cursor-pointer">
      <Image src={category?.bg} fill sizes="inherit" priority alt={category?.bg} className="object-cover -z-10" />
      <div className="p-4 bg-gradient-to-br from-[#c14ac3] via-[#c14ac33b]  to-transparent absolute top-0 w-full h-full">
        <h2 className="text-white">{category?.name}</h2>
      </div>
    </div>
  );
}

export default CategoryBox;
