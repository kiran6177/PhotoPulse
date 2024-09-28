"use client";
import { useGallery } from "@/context/GalleryContext";
import React, { useEffect, useRef, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import ImageManipulation from "../gallery/ImageManipulation";
import { GoPlusCircle } from "react-icons/go";
import FullButton from "../common/FullButton";
import { toast, Toaster } from "sonner";
import useFetch from "@/hooks/fetch";
import { useRouter } from "next/navigation";

function MyAlbumDetail({ id, existCategory }) {
  const [album, setAlbum] = useState("");
  const [showTitle, setShowTitle] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [viewAdd, setViewAdd] = useState(false);
  const [editCategory, setEditCategory] = useState(false);

  const [saveButton, setSaveButton] = useState(false);
  const [deleted, setDeleted] = useState([]);

  const { myGallery ,setMyGallery} = useGallery();

  const imageInputRef = useRef();
  const { data, error, loading, fetchData } = useFetch();
  const router = useRouter();

  useEffect(() => {
    if (id && myGallery?.length > 0) {
      let album = {};
      for (let obj of myGallery) {
        if (obj?._id === id) {
          album = obj;
          break;
        }
      }
      setSelectedCategory(album?.category?.name);
      setAlbum(album);
    }
  }, [id, myGallery]);

  useEffect(() => {
    setSaveButton(true);
  }, [album]);


  useEffect(()=>{
    if(error){
        toast.error(error)
        return
    }
    if(data?.success){
        toast.success("Album Edited Successfully.",{duration:1000});
        setTimeout(()=>{
            setMyGallery(prev=>{
                if(prev?._id === data?.success?._id){
                    return data?.success
                }
                return prev
            })
            router.push("/profile")
        },1000)
        return
    }
  },[data,error])

  const handleSetImages = (newData) => {
    setAlbum((prev) => {
      return {
        ...prev,
        images: newData,
      };
    });
  };

  const handleEditAlbum = (e) => {
    e.preventDefault();
    if (album?.title.trim() === "") return toast.error("Enter the title.");
    if (!selectedCategory.trim() && !addCategory.trim())
      return toast.error("Choose the category.");

    const formData = new FormData();
    formData.append("title", album?.title);
    if (
      album?.category?.name !== (addCategory ? addCategory : selectedCategory)
    ) {
      formData.append("category", addCategory ? addCategory : selectedCategory);
    }
    let i = 0;
    for (let single of album?.images) {
      if (!single?.title?.trim()) {
        return toast.error("Please fill Image Details.");
      } else {
        formData.append(`imageTitle_${i}`, single?.title);
        if (single?.file) {
          formData.append(`image_${i}`, single?.file);
        } else {
          formData.append(`image_id_${i}`, single?._id);
        }
      }
      i++;
    }
    formData.append("deleted", JSON.stringify(deleted));
    fetchData(`/myalbum/${id}/api`, formData, "PUT");
  };

  const handleImage = (e) => {
    const added = [];
    for (let file of e.target.files) {
      const url = URL.createObjectURL(file);
      added.push({
        title: "",
        url,
        file,
      });
    }
    setAlbum((prev) => {
      return {
        ...prev,
        images: [...prev.images, ...added],
      };
    });
  };

  return (
    <form
      onSubmit={handleEditAlbum}
      className="flex flex-col gap-6 w-full my-8"
    >
      <Toaster richColors />
      <div className="flex flex-col  gap-3 text-white w-full sm:w-[65%] lg:w-[40%]">
        <h4
          className="text-lg tracking-wider flex items-center gap-3 w-full"
          htmlFor="#title"
        >
          Title : {album?.title}{" "}
          <FaPencilAlt onClick={() => setShowTitle(!showTitle)} />
        </h4>
        {showTitle && (
          <input
            type="text"
            id="title"
            value={album?.title}
            onChange={(e) =>
              setAlbum((prev) => {
                return {
                  ...prev,
                  title: e.target.value,
                };
              })
            }
            className="inp-type1"
          />
        )}
      </div>

      {editCategory ? (
        <div className="text-white">
          <p className="text-sm">Select Category</p>
          <div className="flex gap-5 my-5 items-center">
            {existCategory?.map((cat, index) => {
              return (
                <div
                  key={index}
                  onClick={() =>
                    setSelectedCategory((prev) =>
                      prev === cat?.name ? "" : cat?.name
                    )
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
      ) : (
        <div className="flex flex-col  gap-3 text-white w-full sm:w-[65%] lg:w-[40%]">
          <h3 className="flex items-center gap-3 w-full">
            Category : {album?.category?.name}{" "}
            <FaPencilAlt onClick={() => setEditCategory(!editCategory)} />
          </h3>
        </div>
      )}
      <p className="text-white text-xs">Drag to Rearrange Images</p>
      {album?.images?.length > 0 && (
        <ImageManipulation
          images={album?.images}
          setImages={handleSetImages}
          setDeleted={setDeleted}
        />
      )}
      <div className="text-white ">
        <div
          onClick={() => imageInputRef.current.click()}
          className="border-2 rounded-md p-3 w-full sm:w-[65%] lg:w-[30%] flex justify-center items-center gap-3 text-xs"
        >
          <GoPlusCircle className="w-[1.5rem] h-[1.5rem] cursor-pointer" />
          <h6>Click to Add more images</h6>
        </div>
        <div>
          <input
            ref={imageInputRef}
            style={{ display: "none" }}
            type="file"
            id="images"
            onChange={handleImage}
            className="inp-type1 bg-white"
            multiple
          />
        </div>
      </div>
      {saveButton && (
        <FullButton disabled={loading ? true : false} type={"submit"} title={loading ? "SAVING..." :"SAVE"} styles={"text-white"} />
      )}
    </form>
  );
}

export default MyAlbumDetail;
