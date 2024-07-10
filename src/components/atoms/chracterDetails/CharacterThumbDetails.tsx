import React from "react";
import { imagePathValidation } from "@/libs/ImagePathValidation";
import { IComic } from "@/interfaces/CharacterComics";
import Image from "next/image";
import { Character } from "@/interfaces/Characters";

const CharacterThumbDetails = ({ char }: { char: Character }) => {
  return (
    <Image
      src={imagePathValidation(char.thumbnail?.path, char.thumbnail?.extension)}
      width={1920}
      height={1080}
      className="rounded-md flex-grow md:flex-grow-0 hover:shadow-lg basis-[300px] md:max-w-[500px] hover:shadow-slate-50/25 hover:scale-105 duration-300 "
      alt={`Foto do personagem: ${char.name}`}
    />
  );
};

export default CharacterThumbDetails;
