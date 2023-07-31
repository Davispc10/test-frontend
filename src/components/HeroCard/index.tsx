import { setHero } from "@/redux/selectedHero/slice";
import { Hero } from "@/types/heroes";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {
  heroData: Hero;
};

const HeroCard = ({ heroData }: Props) => {
  const dispatch = useDispatch();

  const handleSetHeroData = () => {
    dispatch(setHero(heroData));
  };

  return (
    <div
      key={heroData.id}
      className="flex flex-col justify-center items-center gap-2 w-[250px] h-[250px] border-[1px] border-red rounded-lg p-2"
      onClick={handleSetHeroData}
      data-testid="hero-card"
    >
      <Link
        href={{
          pathname: "/hero_details",
          query: {
            id: heroData.id,
          },
        }}
      >
        <div
          className="object-cover w-[150px] h-[150px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroData.thumbnail.path}.${heroData.thumbnail.extension})`,
          }}
        />
        <p className="text-center mt-3">{heroData.name}</p>
      </Link>
    </div>
  );
};

export default HeroCard;
