"use client";
import React, { useEffect, useRef, useState } from "react";
import FullButton from "../common/FullButton";
import { GoPlusCircle } from "react-icons/go";
import ImageManipulation from "./ImageManipulation";
import { toast, Toaster } from "sonner";
import useFetch from "@/hooks/fetch";
import { useRouter } from "next/navigation";
import { useGallery } from "@/context/GalleryContext";

function AddImage({category}) {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [viewAdd, setViewAdd] = useState(false);

  const imageInputRef = useRef();

  const { data, loading, error, fetchData } = useFetch();
  const router = useRouter();
  const {existCategory,setExistCategory,setMyGallery} = useGallery();

  useEffect(()=>{    
    setExistCategory(category)
  },[category])

  useEffect(() => {
    if(data?.success){
      toast.success("Images Uploaded Successfully.",{duration:1000});
      setTimeout(()=>{
        router.push("/profile")
        setMyGallery(prev=>[...prev,data.success])
      },1000)
    }
  }, [data]);

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Enter the title.");
    if (!addCategory.trim() && !selectedCategory.trim())
      return toast.error("Choose the category.");
    if (addCategory.trim() && selectedCategory.trim())
        return toast.error("Choose one category.");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", addCategory ? addCategory : selectedCategory);
    let i = 0;
    for (let single of images) {
      if (!single?.file || !single?.title?.trim()) {
        return toast.error("Please fill Image Details.");
      }else{
        formData.append(`imageTitle_${i}`,single?.title);
        formData.append(`image_${i}`,single?.file);
      }
      i++;
    }
    console.log("VALID");
    
    fetchData("/gallery/add/api", formData, "POST");
  };

  const handleImage = (e) => {
    const imageData = [];
    for (let file of e.target.files) {
      imageData.push({
        title: "",
        url: URL.createObjectURL(file),
        file,
      });
    }
    setImages(imageData);
  };

  return (
    <div className="w-full flex justify-center my-5">
      <Toaster richColors />
      <div className="w-full bg-gradient-to-br from-[#c14ac3] via-[#5010a2] to-[#2003b0] rounded-md p-[1.5px]">
        <form
          onSubmit={handleImageUpload}
          className=" rounded-md text-white p-10 w-full flex flex-col gap-5 bg-[rgb(16,6,24)]"
        >
          <div className="flex flex-col  gap-1">
            <label className="text-sm" htmlFor="#title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="inp-type1"
            />
          </div>
          <div className="flex flex-col  gap-1">
          <label className="text-sm" >
              Upload Images
            </label>
            <div className="my-3  rounded-md p-[2px] bg-gradient-to-br from-[#c14ac3] via-[#5010a2] to-[#2003b0] ">
              <div className="bg-[#171717] py-10">
              <p className="flex items-center gap-4 rounded-md  justify-center  text-[#c1c1c1] hover:text-white hover:scale-[1.005] cursor-pointer tracking-widest transition-all duration-150 ease-linear" 
                  onClick={()=> imageInputRef.current.click()}
              ><GoPlusCircle
                  className="w-[2rem] h-[2rem] cursor-pointer"
                />Click to Add Images</p>
              </div>
            </div>
            <input
              ref={imageInputRef}
              style={{display:"none"}}
              type="file"
              id="images"
              onChange={handleImage}
              className="inp-type1 bg-white"
              multiple
            />
          </div>
          <ImageManipulation images={images} setImages={setImages} />
          <div>
            <p className="text-sm">Select Category</p>
            <div className="flex gap-5 my-5 items-center">
              {existCategory?.map((cat, index) => {
                return (
                  <div
                    key={index}
                    onClick={() =>
                      setSelectedCategory((prev) => (prev === cat?.name ? "" : cat?.name))
                    }
                    className={
                      selectedCategory === cat?.name
                        ? `bg-gradient-to-br from-[#c14ac3] via-[#5010a2] to-[#2003b0]  rounded-full cursor-pointer`
                        : `bg-gradient-to-br from-[#c14ac3] via-[#5010a2] to-[#2003b0] cursor-pointer  rounded-full p-[2px]`
                    }
                  >
                    <p
                      className={
                        selectedCategory === cat?.name
                          ? "rounded-full px-5 py-2"
                          : "bg-[#17131c] rounded-full px-5 py-2"
                      }
                    >
                      {cat?.name}
                    </p>
                  </div>
                );
              })}
              <div>
                <GoPlusCircle
                  onClick={() => setViewAdd(!viewAdd)}
                  className="w-[2rem] h-[2rem] cursor-pointer"
                />
              </div>
            </div>
            {viewAdd && (
              <div className="flex flex-col  gap-1 w-[100%] sm:w-[65%] md:w-[45%] lg:w-[20%]">
                <label className="text-sm" htmlFor="#addcategory">
                  Add New Category
                </label>
                <input
                  type="text"
                  id="addcategory"
                  value={addCategory}
                  onChange={(e) => setAddCategory(e.target.value)}
                  className="inp-type1"
                />
              </div>
            )}
          </div>
          <div className="">
            {error && <p className="text-xs text-red-700">{error}</p>}
          </div>
          <FullButton disabled={loading ? true : false} title={loading ? "UPLOADING..." :"UPLOAD"} type={"submit"} />
        </form>
      </div>
    </div>
  );
}

export default AddImage;
