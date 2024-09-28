import AddImage from "@/Components/gallery/AddImage";
import { GALLERY_BASE_URL } from "@/config";
import { cookies } from "next/headers";

export async function getGalleryData(){
    const res = await fetch(GALLERY_BASE_URL+"/add",{
        headers : {
            authorization : `Bearer ${cookies().get('token') || null}`,
            Cookie :cookies().toString()
        }
    })
    const data = await res.json();
    console.log(data.category);
    
    return data.category
}

export default async function Page() {
    const data = await getGalleryData();

    return (
        <div className="w-full pt-[7rem] px-8">
            <h3 className="text-white">ADD IMAGES</h3>
            <div>
                <AddImage category={data} />
            </div>
        </div>
    );
}