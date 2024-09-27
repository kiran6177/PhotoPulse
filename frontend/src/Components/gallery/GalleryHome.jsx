"use client"
import React from "react";
import GalleryCard from "./GalleryCard";
import FullButton from "../common/FullButton";
import { useRouter } from "next/navigation";

function GalleryHome() {
    const router = useRouter();
  return (
    <div className="w-full flex flex-col  px-8">
      <div className="flex items-center justify-between my-5">
      <h2 className="text-white ">My Gallery</h2>
        <div className="w-[10%] text-white">
        <FullButton title={"UPLOAD"} type={"button"} clickHandler={()=>router.push("/gallery")} />
        </div>
      </div>
      <div className="w-full grid sm:grid-cols-2 lg:grid-cols-4 overflow-hidden gap-3">
        <GalleryCard/>
      </div>
    </div>
  );
}

export default GalleryHome;
