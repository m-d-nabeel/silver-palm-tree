"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categoryFilters } from "@/constants";

export default function Categories() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const handleTags = (filter: string) => {
    router.push(`${pathname}?category=${filter}`);
  };
  return (
    <div className="flexBetween w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-auto">
        {categoryFilters.map((filter) => (
          <button
            key={filter}
            className={`whitespace-nowrap ${
              category === filter
                ? "bg-light-white-300 font-medium"
                : "font-normal"
            } px-4 py-3 rounded-lg capitalize`}
            onClick={() => handleTags(filter)}
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  );
}
