import { Comic } from "@/types/comics";
import Image from "next/image";
import React from "react";

type Props = {
  comics: Comic[];
};

const ComicsList = ({ comics }: Props) => {
  if (!comics) {
    return null;
  }

  const renderComicImage = (comic: Comic) => {
    return (
      <div
        className="w-[250px] h-[300px] bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${comic.thumbnail.path}.${comic.thumbnail.extension})`,
        }}
      />
    );
  };

  return (
    <section className="flex gap-6 flex-wrap items-center justify-between">
      {comics.map((comic) => renderComicImage(comic))}
    </section>
  );
};

export default ComicsList;
