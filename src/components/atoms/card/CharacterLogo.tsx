import { Character, Image as TImage } from "@/interfaces/Characters";
import { ImagePathValidation } from "@/libs/ImagePathValidation";
import Image from "next/image";
import React from "react";

type Props = {
  thumb?: TImage;
  name?: string;
};

const CharacterLogo = ({ thumb, name }: Props) => {
  return (
    <Image
      src={ImagePathValidation(thumb?.path, thumb?.extension)}
      width={150}
      height={150}
      className="rounded-full border-4 border-white aspect-square object-cover"
      alt={`Foto do personagem: ${name}`}
    />
  );
};

export default CharacterLogo;
