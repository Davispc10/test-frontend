import { Hero } from "@/types/heroes";
import React, { useCallback } from "react";
import HeroCard from "../HeroCard";

type Props = {
  heroesList: Hero[];
};

const HeroesList = ({ heroesList }: Props) => {
  const renderHeroesList = useCallback(
    (data: Hero[]) => {
      return (
        <>
          {data.map((hero) => (
            <HeroCard heroData={hero} />
          ))}
        </>
      );
    },
    [heroesList]
  );

  return (
    <div>
      {heroesList && heroesList.length > 0 ? (
        renderHeroesList(heroesList)
      ) : (
        <p>Não há herois a serem listados</p>
      )}
    </div>
  );
};

export default HeroesList;
