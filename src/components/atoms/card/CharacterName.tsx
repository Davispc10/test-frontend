import React from "react";

const CharacterName = ({ charName }: { charName: string }) => {
  return <h2 className="text-lg font-bold text-center">{charName}</h2>;
};

export default CharacterName;
