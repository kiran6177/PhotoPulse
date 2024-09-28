import CategoryBox from "@/Components/gallery/CategoryBox";
import GalleryGrid from "@/Components/gallery/GalleryGrid";
import { GALLERY_BASE_URL } from "@/config";
import { mate } from "@/fonts";
import { cookies } from "next/headers";

export async function fetchCategory() {
  const res = await fetch(GALLERY_BASE_URL + "/home/category", {
    headers: {
      authorization: `Bearer ${cookies().get("token") || null}`,
      Cookie: cookies().toString(),
    },
  });
  const data = await res.json();
  console.log(data?.categoryData);

  return data?.categoryData;
}

export default async function Home() {
  const categoryData = await fetchCategory()
  
  return (
    <div className="px-8 pt-[6rem]">
      <div className="flex gap-3 overflow-x-scroll scrollgallery">
        {
          categoryData?.length > 0 && categoryData?.map(cat=>{
            return <CategoryBox key={cat?._id} category={cat} />
          })
        }
      </div>
      <div className="flex flex-col my-6 items-center">
        <h1
          className={`${mate.className} antialiased text-white text-2xl sm:text-3xl lg:text-[2.5rem]  my-5 tracking-wider`}
        >
          Explore the Images
        </h1>
        <GalleryGrid api={"/api"} />
      </div>
    </div>
  );
}
