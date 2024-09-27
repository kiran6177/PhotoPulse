"use client";
import useWindowSize from "@/hooks/window";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function GalleryGrid() {
  const { width } = useWindowSize();
  const [height, setHeight] = useState(400);
  const [widthCount, setWidthCount] = useState(0);
  const [imagesArr, setImagesArr] = useState([]);
  const images = [
    "/1.jpg",
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
    "/5.jpg",
    "/6.jpg",
    "/7.jpg",
    "/8.jpg",
    "/9.jpg",
    "/10.jpg",
  ];

  useEffect(() => {}, [width, images]);

  return (
    <div  className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3" >
      {images?.map((src, index) => {
        return (
          <div
            key={index}
            className={`mb-3 overflow-hidden rounded-sm`}
          >
            <Image src={src} width={500} height={500} layout="responsive" sizes="inherit" className="object-cover " />
          </div>
        );
      })}
    </div>
    
  );
}

export default GalleryGrid;
