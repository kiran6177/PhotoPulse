import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata = {
    title : "Category | PhotoPulse",
    description : "Categories in PhotoPulse"
}

export default async function Page({ params }) {
  const { id } = params;
  return (
    <div className="w-full pt-[7rem] px-8">
      <GalleryGrid api={"/category/"+id + "/api"} id={id}/>
    </div>
  );
}
