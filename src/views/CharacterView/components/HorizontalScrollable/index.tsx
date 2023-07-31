import React, { useState } from "react";
import Image from "next/image";
import { tv } from "tailwind-variants";
import EyeIcon from "@/components/icons/Eye";

interface HorizontalScrollableProps {
  comicsImages: string[];
  characterName: string;
  onSelectComicPhoto: (comicPhoto: number) => void;
}

const scrollableImagesStyle = tv({
  base: `
    overflow-x-auto flex gap-4 max-w-7xl w-full mt-8 pb-4
    scrollbar scrollbar-thumb-red-900 scrollbar-track-red-500/20
  `,
});

const seePhotoStyle = tv({
  base: `
    see-more grid place-content-center invisible absolute inset-0 z-3 bg-[#0c1f38]/60
    [&:hover>svg]:translate-y-0 [&:hover>svg]:opacity-100
  `,
});

export default function HorizontalScrollable({
  comicsImages,
  characterName,
  onSelectComicPhoto,
}: HorizontalScrollableProps) {
  return (
    <div className={scrollableImagesStyle()}>
      {comicsImages?.map((comic, i) => (
        <div
          key={comic}
          className="cursor-pointer"
          onClick={() => onSelectComicPhoto(i)}
        >
          <ImageLoad comicPhoto={comic} charactersName={characterName} />
        </div>
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
    <div className="aspect-[1/1.72] min-w-[100px] w-[100px] min-h-[172px] relative [&:hover>.see-more]:visible">
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
      <div className={seePhotoStyle()}>
        <EyeIcon className="translate-y-4 transition-all opacity-50 fill-white" />
      </div>
    </div>
  );
};
