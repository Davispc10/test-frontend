import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import FavHeroesTemplate from "../../components/templates/FavHeroesTemplate";

const FavHeroes = () => {
  const { favHeroes } = useSelector((state: RootState) => state.hero);

  return (
    <div className="flex flex-col w-screen h-screen p-2 font-bangers">
      <FavHeroesTemplate 
        data={favHeroes}
      />
    </div>
  );
}

export default FavHeroes