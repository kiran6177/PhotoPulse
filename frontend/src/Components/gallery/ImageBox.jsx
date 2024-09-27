"use client";
import { useSortable } from "@dnd-kit/sortable";
import Image from "next/image";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

function ImageBox({ index, handleImageTitle, url, images }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: index + 1 });

  const handleSpace = (e) => e.stopPropagation();
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={
        isDragging
          ? "opacity-40 bg-white p-2 rounded-md"
          : isOver
          ? "opacity-40 bg-white p-2 rounded-md scale-75"
          : "bg-white p-2 rounded-md"
      }
    >
      <div className="relative w-full h-[200px] rounded-md overflow-hidden">
        <Image src={url} fill alt="alt" className="object-cover z-0" />
      </div>
      <div className="flex flex-col  gap-1 mt-3">
        <label className="text-xs text-black" htmlFor={`#imgtitle${index}`}>
          Image Title
        </label>
        <input
          type="text"
          id={`#imgtitle${index}`}
          value={images[index]?.imageTitle}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onChange={(e) => handleImageTitle(e, index)}
          onKeyDown={handleSpace}
          className="inp-type1"
        />
      </div>
    </div>
  );
}

export default ImageBox;
