"use client";

import { useComicsByCharacter } from "@hooks/use-comics-by-character";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { CharacterComic } from "./character-comic.component";
import Lightbox from "yet-another-react-lightbox";

export type CharacterComicsProps = {
  characterId: number;
};

const CharacterComicsElement: React.FC<CharacterComicsProps> = ({
  characterId,
}) => {
  const { comics, isLoading } = useComicsByCharacter(characterId, {
    search: {
      limit: 100,
      orderBy: "title",
      offset: 0,
    },
  });

  const [imageOpen, setImageOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    return () => {
      setImageOpen(false);
      setImageIndex(0);
    };
  }, []);

  if (isLoading)
    return (
      <span className="text-marvel-typo font-light text-base w-full text-center my-4">
        Carregando comics...
      </span>
    );

  return (
    <div className="inline-flex flex-nowrap flex-row justify-center items-center w-auto h-auto py-6 space-x-4">
      <Lightbox
        open={imageOpen}
        close={() => setImageOpen(false)}
        slides={comics.map((comic) => ({
          src: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
          alt: comic.title,
        }))}
        index={imageIndex}
      />

      {comics.map((comic, idx) => {
        return (
          <CharacterComic
            onClick={() => {
              setImageIndex(idx);
              setImageOpen(true);
            }}
            key={comic.id}
            comic={comic}
          />
        );
      })}
    </div>
  );
};

export const CharacterComics = memo<CharacterComicsProps>(
  CharacterComicsElement
);
