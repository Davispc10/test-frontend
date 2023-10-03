import Image from "next/image";
import React from "react";
import { Character } from "types/character";

interface CharacterCardProps {
  character: Character;
  onClick: any;
  src: string;
}

function CharacterCard({ character, onClick, src }: CharacterCardProps) {
  return (
    <div
      key={character.id}
      className="my-5 h-80 relative cursor-pointer rounded-xl"
      onClick={() => onClick()}
    >
      <div>
        <Image
          src={src}
          alt={character.name}
          width={320}
          height={320}
          unoptimized
          priority
          className="max-w-full	rounded-xl h-80 filter grayscale hover:grayscale-0	"
        />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 p-2 text-white w-full text-center rounded-t-lg">
          <h2 className="text-xl">{character.name}</h2>
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
