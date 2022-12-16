"use client";

import Lightbox from "yet-another-react-lightbox";
import { Character, CharacterJSON } from "@core/domain/entities/character";
import Image from "next/image";
import { memo, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@components/ui/button/button.component";
import { useRouter } from "next/navigation";
import { CharacterComics } from "./character-comics.component";

export type CharacterProfileProps = {
  character: Character | CharacterJSON;
};

const CharacterProfileElement: React.FC<CharacterProfileProps> = ({
  character,
}) => {
  const router = useRouter();
  const [imageOpen, setImageOpen] = useState(false);

  useEffect(() => {
    return () => {
      setImageOpen(false);
    };
  }, []);

  const thumbnail = useMemo(
    () => `${character.thumbnail.path}.${character.thumbnail.extension}`,
    [character.thumbnail]
  );

  const imageClasses = twMerge(
    "inline-flex relative rounded-lg overflow-hidden border-4 border-marvel-accent border-dashed",
    "group p-2 cursor-pointer",
    "bg-marvel-white overflow-hidden",
    "before:absolute before:inset-0",
    "before:-translate-x-full before:animate-[shimmer_6s_infinite]",
    "before:bg-gradient-to-r before:from-transparent",
    "before:via-white/20 before:to-transparent before:z-50"
  );

  return (
    <div className="flex w-full max-w-lg flex-col flex-grow justify-center items-center">
      <Lightbox
        open={imageOpen}
        close={() => setImageOpen(false)}
        slides={[{ src: thumbnail, alt: character.name }]}
      />
      <div onClick={() => setImageOpen(true)} className={imageClasses}>
        <Image
          className="w-full max-w-xs rounded-lg transition-all duration-200 ease-in-out group-hover:scale-[1.025]"
          src={thumbnail}
          width={500}
          height={500}
          alt={character.name}
          priority
        />
      </div>

      <h2 className="font-bold text-3xl mt-4 text-marvel-typo text-center">
        {character.name}
      </h2>

      <p className="font-normal text-center text-marvel-typo text-base mt-2">
        {character.description}
      </p>

      <Button
        className="my-4"
        colorStyle="default"
        iconPrefix={<ArrowSmallLeftIcon className="w-[24px] h-[24px]" />}
        onClick={() => router.back()}
      >
        Voltar
      </Button>

      <hr />

      <h3 className="text-2xl my-2 text-marvel-typo font-medium w-full text-center">
        Comics
      </h3>
      <div className="flex w-full flex-col space-y-4 h-auto justify-center items-start overflow-x-auto touch-pan-x scrollbar">
        <CharacterComics characterId={character.id} />
      </div>
    </div>
  );
};

export const CharacterProfile = memo<CharacterProfileProps>(
  CharacterProfileElement
);
