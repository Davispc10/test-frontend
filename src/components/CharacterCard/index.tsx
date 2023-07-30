import { Character } from "@/types/Character";
import Image from "next/image";
import React from "react";
import { tv } from "tailwind-variants";
import HeroFrame from "../../../public/images/hero-frame.svg";
import { anton } from "@/styles/fonts";

interface CharacterCardProps {
  character: Character;
  isLoading?: boolean;
  className?: string;
}

const containerStyle = tv({
  base: `
    aspect-[11/16] max-w-[15rem] w-full overflow-hidden
    hover:animate-[smbounce_1s_ease-in-out_infinite] transition-all
    cursor-pointer
    flex flex-col relative
  `,
});

const nameStyle = tv({
  base: `
    absolute left-1 bottom-0 z-10 text-2xl text-[#F7F502]
    [&::first-letter]:text-5xl
  `,
});

<div className="aspect-[11/16]"></div>;

export default function CharacterCard({
  character,
  isLoading = false,
  className,
}: CharacterCardProps) {
  return (
    <div className={containerStyle({ className })}>
      <Image
        src={character.thumbnail.path + "." + character.thumbnail.extension}
        alt={`${character.name}'s photo`}
        fill
        sizes="100vw"
        className="object-cover"
        style={{
          top: 14,
        }}
        draggable={false}
      />
      <h3
        className={nameStyle({
          className: anton.className,
        })}
        style={{
          textShadow: "2px -2px red",
        }}
      >
        {character.name}
      </h3>
      <Image
        src={HeroFrame}
        priority
        alt="border frame"
        fill
        draggable={false}
      />
      {/* <p>{character.description}</p> */}
    </div>
  );
}
