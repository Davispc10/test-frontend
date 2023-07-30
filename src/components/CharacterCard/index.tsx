import { Character } from "@/types/Character";
import Image from "next/image";
import React, { useState } from "react";
import { tv } from "tailwind-variants";
import HeroFrame from "../../../public/images/hero-frame.svg";
import { anton } from "@/styles/fonts";
import { Eye } from "@phosphor-icons/react";
import Link from "next/link";
import { APP_PAGES } from "@/utils/appPages";

interface CharacterCardProps {
  character: Character;
  isLoading?: boolean;
  href: string;
  className?: string;
}

const containerStyle = tv({
  base: `
    aspect-[11/16] max-w-[15rem] w-full overflow-hidden
    hover:animate-[smbounce_1s_ease-in-out_infinite] transition-all
    cursor-pointer
    flex flex-col relative
    [&:hover>.see-more]:visible
  `,
});

const nameStyle = tv({
  base: `
    absolute left-1 bottom-0 z-10 text-2xl text-[#F7F502]
    [&::first-letter]:text-5xl
  `,
});

const seeMoreStyle = tv({
  base: `
    see-more invisible absolute inset-0 top-5 z-10 bg-[#0c1f38]/60
    flex gap-2 items-center justify-center text-white text-3xl
  `,
});

<div className="tran"></div>;

export default function CharacterCard({
  character,
  isLoading = false,
  href,
  className,
}: CharacterCardProps) {
  const [loadComplete, setLoadComplete] = useState(false);
  return (
    <Link className={containerStyle({ className })} href={href}>
      {!loadComplete && (
        <div className="animate-pulse bg-red-700 top-[14px] absolute inset-0" />
      )}
      <Image
        src={character.thumbnail.path + "." + character.thumbnail.extension}
        alt={`${character.name}'s photo`}
        fill
        sizes="100vw"
        className="object-cover"
        onLoadingComplete={() => {
          setLoadComplete(true);
        }}
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
      <div className={seeMoreStyle()}>
        <Eye size={32} /> See more
      </div>
    </Link>
  );
}
