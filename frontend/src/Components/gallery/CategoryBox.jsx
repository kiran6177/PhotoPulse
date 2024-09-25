import Image from "next/image";
import React from "react";

function CategoryBox() {
  return (
    <div className="rounded-md w-full max-w-[20%] relative min-h-[8rem] overflow-hidden">
      <Image src={"/Tech-1.jpg"} layout="fill" className="object-cover -z-10" />
      <div className="p-4 bg-gradient-to-br from-[#c14ac3] via-[#c14ac33b]  to-transparent absolute top-0 w-full h-full">
        <h2 className="text-white">Tech</h2>
      </div>
    </div>
  );
}

export default CategoryBox;
