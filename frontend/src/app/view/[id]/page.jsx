import ViewAlbum from "@/Components/album/ViewAlbum";
import { GALLERY_BASE_URL } from "@/config";
import { cookies } from "next/headers";

export async function fetchAlbum(album_id) {
  const res = await fetch(GALLERY_BASE_URL + "/album/" + album_id, {
    headers: {
      authorization: `Bearer ${cookies().get("token") || null}`,
      Cookie: cookies().toString(),
    },
  });
  const data = await res.json();
  console.log(data);

  return data;
}

export async function generateMetadata({ params }) {
    const { id } = params;
    const albumData = await fetchAlbum(id); 
    
    return {
      title: albumData.title + " | PhotoPulse " || "Album | PhotoPulse",
      description: albumData.title + " of " + albumData.category?.name || "View album details"
    };
  }

export default async function Page({ params }) {
  const { id } = params;
  const albumData = await fetchAlbum(id);

  return (
    <div className="w-full pt-[7rem] px-8">
      <ViewAlbum albumData={albumData} />
    </div>
  );
}
