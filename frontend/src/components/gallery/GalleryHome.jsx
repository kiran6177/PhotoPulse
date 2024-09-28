"use client";
import React, { useEffect } from "react";
import GalleryCard from "./GalleryCard";
import FullButton from "../common/FullButton";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/fetch";
import { useGallery } from "@/context/GalleryContext";

function GalleryHome() {
  const router = useRouter();
  const { data, loading, error, fetchData } = useFetch();
  const { myGallery, setMyGallery } = useGallery();

  useEffect(() => {
    if (data?.myGalleryImages) {
      setMyGallery(data?.myGalleryImages);
      return;
    }
    fetchData("/gallery/api");
  }, [data]);
  return (
    <div className="w-full flex flex-col  px-8">
      <div className="flex items-center justify-between my-5">
        <h2 className="text-white ">My Gallery</h2>
        <div className="w-[10%] text-white">
          <FullButton
            title={"UPLOAD"}
            type={"button"}
            clickHandler={() => router.push("/gallery")}
          />
        </div>
      </div>
      <div className="w-full grid sm:grid-cols-2 lg:grid-cols-4 overflow-hidden gap-3">
        {
          myGallery?.length > 0 && myGallery.map((album,index)=>{
            return <GalleryCard key={index} album={album} />
          })
          }
      </div>
    </div>
  );
}

export default GalleryHome;
