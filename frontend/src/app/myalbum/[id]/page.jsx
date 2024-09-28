import MyAlbumDetail from "@/Components/album/MyAlbumDetail";
import { GALLERY_BASE_URL } from "@/config";
import { cookies } from "next/headers";

export async function getGalleryData(){
    const res = await fetch(GALLERY_BASE_URL+"/add",{
        headers : {
            Cookie :cookies().toString()
        }
    })
    const data = await res.json();
    console.log(data.category);
    
    return data.category
}


export default async function Page({ params }) {
  const { id } = params;
  const data = await getGalleryData();
  return (
    <div className="w-full pt-[6rem] px-8">
        <MyAlbumDetail id={id} existCategory={data} />
    </div>
  );
}
