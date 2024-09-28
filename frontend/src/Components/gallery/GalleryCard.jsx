"use client";
import { useGallery } from "@/context/GalleryContext";
import useFetch from "@/hooks/fetch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { toast, Toaster } from "sonner";

function GalleryCard({ album }) {
  const router = useRouter();
  const { data, loading, error, fetchData } = useFetch();
  const { myGallery,setMyGallery } = useGallery();

  useEffect(() => {
    if (data?.success) {
      toast.success("Album Deleted Successfully.", { duration: 1000 });
      setTimeout(() => {
        let newGallery = [...myGallery]?.filter(each=>album?._id !== each?._id)
        setMyGallery(newGallery)
      }, 1000);
    }
  }, [data]);

  const handleDelete = (e) => {
    e.stopPropagation();
    console.log(album);
    fetchData(`/myalbum/${album?._id}/api`, {}, "DELETE");
  };

  return (
    <div
      onClick={() => router.push(`/myalbum/${album?._id}`)}
      className="bg-white p-3 rounded-sm flex flex-col gap-3 cursor-pointer"
    >
      <Toaster richColors />
      <div
        className={`relative w-full min-h-[200px] overflow-hidden rounded-md`}
      >
        {album?.images?.length > 0 && (
          <Image
            src={album?.images[0].url}
            fill
            sizes="inherit"
            className="object-cover "
            alt={album?.images[0].title}
          />
        )}
      </div>
      <div className="flex justify-between items-center">
        <h1>{album?.title}</h1>
        <MdDelete
          onClick={handleDelete}
          className="text-[#434343] w-[1.5rem] h-[1.5rem] hover:scale-[1.05] hover:text-black transition-all duration-150 ease-linear"
        />
      </div>
    </div>
  );
}

export default GalleryCard;
