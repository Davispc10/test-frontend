import CharacterThumbDetails from "@/components/atoms/chracterDetails/CharacterThumbDetails";
import CharacterInfos from "@/components/molecules/characterInfos/CharaterInfos";
import { Character } from "@/interfaces/Characters";
import React from "react";

const CharacterDetail = ({ data }: { data: Character }) => {
  return (
    <div className="flex flex-wrap-reverse justify-between gap-8">
      <CharacterInfos charName={data.name} charDesc={data.description} />

      <CharacterThumbDetails char={data} />
    </div>
  );
};

export default CharacterDetail;
