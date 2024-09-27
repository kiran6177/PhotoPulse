import Image from "next/image";
import React from "react";

function GalleryCard() {
  return (
    <div className="bg-white p-3 rounded-sm flex flex-col gap-3">
      <div
        className={`relative w-full min-h-[200px] overflow-hidden rounded-md`}
      >
        <Image src={"/1.jpg"} fill sizes="inherit" className="object-cover " />
      </div>
      <div>
        <h1>TITLE</h1>
      </div>
    </div>
  );
}

export default GalleryCard;
