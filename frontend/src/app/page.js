import CategoryBox from "@/Components/gallery/CategoryBox";
import GalleryGrid from "@/Components/gallery/GalleryGrid";
import { mate } from "@/fonts";

export async function fetchCategory() {
  const res = await fetch(GALLERY_BASE_URL + "/add", {
    headers: {
      authorization: `Bearer ${cookies().get("token") || null}`,
      Cookie: cookies().toString(),
    },
  });
  const data = await res.json();
  console.log(data.category);

  return data.category;
}

export default function Home() {
  return (
    <div className="px-8 pt-[6rem]">
      <div className="flex gap-3">
        <CategoryBox />
      </div>
      <div className="flex flex-col my-6 items-center">
        <h1
          className={`${mate.className} antialiased text-white text-[2.5rem]  my-5 tracking-wider`}
        >
          Explore the Images
        </h1>
        <GalleryGrid />
      </div>
    </div>
  );
}
