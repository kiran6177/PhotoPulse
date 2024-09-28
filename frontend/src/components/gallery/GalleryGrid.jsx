"use client";
import useFetch from "@/hooks/fetch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PulseLoader } from "react-spinners";

function GalleryGrid({api,id}) {
  const [imagesArr, setImagesArr] = useState([]);
  const { data, error, loading, fetchData } = useFetch();
  const [page, setPage] = useState(1);

  const scrollRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    fetchData(`${api}?page=${1}`);
  },  []);


  useEffect(()=>{
    if(data?.imagesData?.length){
      setImagesArr(prev=>[...prev,...data?.imagesData])
    }
  },[data])

  const nextPage = () => {
    fetchData(`${api}?page=${page+1}`);
    setPage(prev=>prev+1)
  };

  return (
    <div
      ref={scrollRef}
      className="relative pb-16"
    >
      <h2 className="text-white tracking-wider text-xl  md:text-2xl mb-10">{data?.details?.name}</h2>

      {imagesArr && imagesArr.length > 0 ? (
        <InfiniteScroll
          dataLength={imagesArr?.length}
          scrollThreshold={"750px"}
          scrollableTarget={scrollRef}
          next={nextPage}
          loader={
            <div className="absolute bottom-[1rem] w-full left-0 flex justify-center">
              <PulseLoader  color="#f6ae2d" />
            </div>
          }
          hasMore={true}
        >
          {imagesArr.map((image, index) => {
            return (
              <div key={index} onClick={()=>router.push(`/view/${image?.album_id}`)} className={`cursor-pointer relative mb-3 overflow-hidden rounded-sm group`} >
                <Image
                  src={image.url}
                  width={500}
                  height={500}
                  sizes="inherit"
                  alt={image?.title}
                  className="object-cover "
                />
                <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out w-full h-full bg-gradient-to-t from-black via-transparent to-transparent top-0 left-0 z-10 flex">
                  <p className="text-white  text-xs tracking-wider self-end p-5">{image.title}</p>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      ) : 
      (
        <div className="text-white tracking-widest">NO IMAGES FOUND.</div>
      )}
    </div>
  );
}

export default GalleryGrid;
