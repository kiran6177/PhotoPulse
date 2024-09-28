"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function ViewAlbum({albumData}) {
    const [mainImage,setMainImage] = useState(null);

    useEffect(()=>{
        if(albumData?.images[0]){
            setMainImage(albumData?.images[0])
        }
    },[albumData])

  return (
<div className="bg-[#432b487e] p-6 rounded-md flex justify-between">
        <div className="w-[70%]">
          <div
            className={`cursor-pointer relative mb-3 overflow-hidden rounded-md group flex justify-center bg-[#000000bb]  aspect-video`}
          >
            {mainImage?.url && (
              <Image
                src={mainImage?.url}
                fill
                sizes="inherit"
                alt={mainImage?.title}
                className="object-contain h-full "
              />
            )}
          </div>
          <div className="w-full flex overflow-x-scroll scrollgallery gap-2">
            {albumData?.images?.length > 0 &&
              albumData.images.map((imageObj) => {
                return (
                  <div
                    key={imageObj?._id}
                    className={`rounded-md cursor-pointer relative mb-3 overflow-hidden  group flex justify-center bg-[#000000dc] w-[25%] aspect-video`}
                  >
                    <Image
                      onClick={()=>setMainImage(imageObj)}
                      src={imageObj?.url}
                      fill
                      sizes="inherit"
                      alt={imageObj?.title}
                      className="object-contain h-full "
                    />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="bg-gradient-to-br rounded-md from-[#000000] via-[#000000] to-[#280069] w-[27%] p-8 flex flex-col items-center gap-5 text-white">
        <div
            className={`cursor-pointer relative mb-3 overflow-hidden rounded-full group flex justify-center bg-[#000000bb] aspect-square w-[60%]  border-2`}
          >
            {albumData?.images[0]?.url && (
              <Image
                src={albumData?.images[0]?.url}
                fill
                sizes="inherit"
                alt={albumData?.images[0]?.title}
                className="object-contain h-full "
              />
            )}
          </div>
          <p className="text-2xl tracking-wider">{albumData?.title}</p>
          <p className="text-sm">
            <span className="bg-gradient-to-r from-[#c14ac3] via-[#5010a2] to-[#2003b0] bg-clip-text text-transparent tracking-wider">
              Category :{" "}
            </span>
            <span className="text-white tracking-wider">
              {albumData?.category?.name}
            </span>
          </p>
          <p className="text-sm">
            <span className="bg-gradient-to-r from-[#c14ac3] via-[#5010a2] to-[#2003b0] bg-clip-text text-transparent tracking-wider">
              Uploaded By :{" "}
            </span>
            <span className="text-white tracking-wider">
              {albumData?.user_id?.name}
            </span>
          </p>
        </div>
      </div>
  )
}

export default ViewAlbum
