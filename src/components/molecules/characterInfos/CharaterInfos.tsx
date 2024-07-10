import CharacterDescriptionDetails from "@/components/atoms/chracterDetails/CharacterDescriptionDetails";
import CharacterNameDetails from "@/components/atoms/chracterDetails/CharacterNameDetails";
import React from "react";

const CharacterInfos = ({
  charName,
  charDesc,
}: {
  charName: string;
  charDesc?: string;
}) => {
  return (
    <div className="basis-96 flex-grow">
      <CharacterNameDetails charName={charName} />
      <CharacterDescriptionDetails characterDesc={charDesc} />
    </div>
  );
};

export default CharacterInfos;
