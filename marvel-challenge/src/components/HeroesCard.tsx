import { useState } from "react";
import { HeroesItem } from "./HeroesItem";
import { heroesWithoutPhoto } from "@/utils/heroesWithoutPhoto";
import { heroesWithoutDescription } from "@/utils/heroesWithoutDescription";
import { Pagination } from "./Pagination";

export function HeroesCard({ heroes }) {
  const [page, setPage] = useState(1);
  // console.log(page);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 mt-4">
        {heroes?.map((result) => {
          return (
            <HeroesItem
              key={result.id}
              name={result.name}
              description={heroesWithoutDescription(result.description)}
              image={heroesWithoutPhoto(result.thumbnail)}
            />
          );
        })}
      </div>
      <Pagination
        totalCountOfRegisters={100}
        currentPage={page}
        onPageChange={setPage}
      />
    </>
  );
}
