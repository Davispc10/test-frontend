import ComicThumb from "@/components/atoms/comics/ComicThumb";
import ComicTitle from "@/components/atoms/comics/ComicTitle";
import SkeletonComicThumb from "@/components/atoms/skeleton/SkeletonComicThumb";
import SkeletonNameCard from "@/components/atoms/skeleton/SkeletonNameCard";
import { IComic } from "@/interfaces/CharacterComics";
import React from "react";

const SkeletonComicCard = () => {
  return (
    <div className="w-64 bg-slate-600 p-2 rounded text-neutral-800 flex gap-2 flex-col items-center">
      <SkeletonComicThumb />
      <SkeletonNameCard />
    </div>
  );
};

export default SkeletonComicCard;
