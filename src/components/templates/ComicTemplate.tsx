import { IComic } from "@/interfaces/CharacterComics";
import React from "react";
import ComicCard from "../molecules/comicCard/ChomicCard";
import ComicList from "../organisms/ComicsList";
import { useQuery } from "react-query";
import { fechCharacterComics } from "@/libs/fetchCharacterComics";
import SkeletonComicCardList from "../organisms/SkeletonComicCard.tsx";

const ComicTemplate = ({ charId }: { charId: string }) => {
  const { data, isLoading } = useQuery(["characterComic" + charId], () =>
    fechCharacterComics(Number(charId))
  );
  return (
    <section className="flex flex-col items-center gap-6">
      <h4 className="font-bold text-3xl">Quadrinhos</h4>
      {isLoading ? (
        <SkeletonComicCardList />
      ) : (
        <ComicList data={data?.results} />
      )}
    </section>
  );
};

export default ComicTemplate;
