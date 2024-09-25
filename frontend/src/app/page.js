import CategoryBox from "@/Components/gallery/CategoryBox";
import Image from "next/image";

export default function Home() {
  return (
    <div className="px-8">
      <div className="flex gap-3">
        <CategoryBox/>
      </div>
    </div>
  );
}
