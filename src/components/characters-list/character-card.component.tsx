import { Card } from "@components/ui/card/card.component";
import { StaticImageData } from "next/image";
import { memo } from "react";

export type CharacterCardProps = {
  id: number;
  name: string;
  thumbnail: string | StaticImageData;
};

export const CharacterCard = memo<React.FC<CharacterCardProps>>(
  function CharacterCard({ id, name, thumbnail }: CharacterCardProps) {
    return (
      <Card
        key={id}
        title={name}
        truncate
        image={thumbnail}
        className="group grow w-32 sm:w-52 xl:w-64 select-none"
        footer={
          <p className="text-gray-400 transition duration-300 font-normal text-sm group-hover:text-blue-400">
            + Informações
          </p>
        }
      />
    );
  }
);
