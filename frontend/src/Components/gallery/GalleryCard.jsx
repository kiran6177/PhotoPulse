"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function GalleryCard({album}) {
  const router = useRouter();
  return (
    <div onClick={()=>router.push(`/myalbum/${album?._id}`)} className="bg-white p-3 rounded-sm flex flex-col gap-3 cursor-pointer">
      <div
        className={`relative w-full min-h-[200px] overflow-hidden rounded-md`}
      >
        {
          album?.images?.length > 0 &&
        <Image src={album?.images[0].url} fill sizes="inherit" className="object-cover " alt={album?.images[0].title} />
         }
      </div>
      <div>
        <h1>{album?.title}</h1>
      </div>
    </div>
  );
}

export default GalleryCard;
