"use client";
import { useRouter } from "next/navigation";
import Button from "./Button";

type Props = {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export default function Pagination({
  startCursor,
  endCursor,
  hasPreviousPage,
  hasNextPage,
}: Props) {


  const router = useRouter();


  const handleNavigation = (direction: string) => {

    const currentParams = new URLSearchParams(window.location.search);


    if (direction === "next" && hasNextPage) {

      currentParams.delete("startCursor");
      currentParams.set("endCursor", endCursor);

    } else if (direction === "previous" && hasPreviousPage) {

      currentParams.delete("endCursor");
      currentParams.set("startCursor", startCursor);

    }

    const newSearchParams = currentParams.toString();

    const newPathname = `${window.location.pathname}?${newSearchParams}`;

    router.push(newPathname);
    
  };
  return (
    <div className="flexCenter w-full gap-5 mt-10">
      {hasPreviousPage && (
        <Button
          title="Previous Page"
          handleClick={() => handleNavigation("previous")}
        />
      )}
      {hasNextPage && (
        <Button
          title="Next Page"
          handleClick={() => handleNavigation("next")}
        />
      )}
    </div>
  );
}
