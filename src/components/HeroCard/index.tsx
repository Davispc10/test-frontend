import { Hero } from "@/types/heroes";
import Image from "next/image";
import React from "react";

type Props = {
  heroData: Hero;
};

const HeroCard = ({ heroData }: Props) => {
  return (
    <div
      key={heroData.id}
      className="flex flex-col items-center gap-2 w-[300px]"
    >
      <Image
        src={`${heroData.thumbnail.path}.${heroData.thumbnail.extension}`}
        alt="Hero Thumbnail"
        width={180}
        height={230}
      />
      {heroData.name}
    </div>
  );
};

export default HeroCard;
