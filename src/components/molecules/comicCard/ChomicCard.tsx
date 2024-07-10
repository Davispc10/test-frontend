import ComicThumb from "@/components/atoms/comics/ComicThumb";
import ComicTitle from "@/components/atoms/comics/ComicTitle";
import { IComic } from "@/interfaces/CharacterComics";
import React from "react";

const ComicCard = ({ comic }: { comic: IComic }) => {
  return (
    <div className="w-64 bg-neutral-50 p-2 rounded text-neutral-800 items-center">
      <ComicThumb
        comicTitle={comic.title}
        extension={comic.thumbnail?.extension}
        path={comic.thumbnail?.path}
      />
      <ComicTitle title={comic.title} />
    </div>
  );
};

export default ComicCard;
