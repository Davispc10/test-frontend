import { Comic, ComicJSON } from "@core/domain/entities/comic";
import { useComicsByCharacter } from "@hooks/use-comics-by-character";
import Image from "next/image";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

export type CharacterComicProps = {
  comic: Comic | ComicJSON;
} & React.HTMLAttributes<HTMLDivElement>;

const CharacterComicElement: React.FC<CharacterComicProps> = ({
  comic,
  className,
  ...rest
}) => {
  const classes = twMerge(
    "group w-32 sm:w-40 lg:w-44 bg-white shadow-sm rounded-lg aspect-[3/4] cursor-pointer",
    className
  );
  return (
    <div {...rest} className={classes}>
      <Image
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        className="select-none transition ease-in-out duration-200 transform group-hover:scale-[1.025]"
        draggable={false}
        alt={comic.title}
        width={300}
        height={450}
      />
    </div>
  );
};

export const CharacterComic = memo<CharacterComicProps>(CharacterComicElement);
