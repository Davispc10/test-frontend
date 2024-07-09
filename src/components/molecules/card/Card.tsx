import CharacterDetailsBtn from "@/components/atoms/card/CharacterDetailsBtn";
import CharacterLogo from "@/components/atoms/card/CharacterLogo";
import CharacterName from "@/components/atoms/card/CharacterName";
import { Character } from "@/interfaces/Characters";
import React from "react";

const Card = ({ char }: { char: Character }) => {
  return (
    <div
      className="w-80 bg-neutral-800 p-4 rounded duration-300 hover:shadow-lg hover:shadow-slate-600 text-neutral-50 flex flex-col justify-center items-center gap-4"
      key={char.id}
    >
      <CharacterLogo thumb={char.thumbnail} name={char.name} />
      <CharacterName charName={char.name} />
      <CharacterDetailsBtn charId={char.id} />
    </div>
  );
};

export default Card;
