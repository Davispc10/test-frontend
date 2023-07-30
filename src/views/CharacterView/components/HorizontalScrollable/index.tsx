import React, { useState } from "react";
import Image from "next/image";
import { tv } from "tailwind-variants";
import { Character } from "@/types/Character";

interface HorizontalScrollableProps {
  comicsImages: string[];
  characterName: string;
  totalComics: number;
}

const scrollableImagesStyle = tv({
  base: `
    overflow-x-auto flex gap-4 max-w-7xl w-full mt-8 pb-4
    scrollbar scrollbar-thumb-red-900 scrollbar-track-red-500/20
  `,
});

export default function HorizontalScrollable({
  comicsImages,
  characterName,
  totalComics,
}: HorizontalScrollableProps) {
  console.log("comicsImages", comicsImages.length);
  console.log("totalComics", totalComics);

  return (
    <div className={scrollableImagesStyle()}>
      {comicsImages?.map((comic) => (
        <ImageLoad
          key={comic}
          comicPhoto={comic}
          charactersName={characterName}
        />
      ))}
    </div>
  );
}

const ImageLoad = ({
  comicPhoto,
  charactersName,
}: {
  comicPhoto: string;
  charactersName: string;
}) => {
  const [loadComplete, setLoadComplete] = useState(false);
  return (
    <div className="aspect-[1/1.72] min-w-[100px] w-[100px] min-h-[172px] relative">
      {!loadComplete && (
        <div className="absolute inset-0 animate-pulse bg-slate-600" />
      )}
      <Image
        src={comicPhoto}
        alt={`${charactersName}'s photo`}
        fill
        sizes="100vw"
        className="object-cover absolute inset-0"
        onLoadingComplete={() => {
          setLoadComplete(true);
        }}
      />
    </div>
  );
};
