import { Hero } from "@/types/heroes";
import React from "react";

type Props = {
  heroData: Hero;
};

const HeroCard = ({ heroData }: Props) => {
  return <div key={heroData.id}>{heroData.name}</div>;
};

export default HeroCard;
