import { Card } from "@components/ui/card/card.component";
import { StaticImageData } from "next/image";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

export type CharacterCardProps = {
  id: number;
  name: string;
  thumbnail: string | StaticImageData;
  isLoading?: boolean;
  priority?: boolean;
  onClick?: () => void;
};

export const CharacterCard = memo<React.FC<CharacterCardProps>>(
  function CharacterCard({
    id,
    name,
    thumbnail,
    isLoading = false,
    priority = false,
    onClick,
  }: CharacterCardProps) {
    const loadingClasses = twMerge(
      "relative rounded-lg grow w-32 h-40 sm:w-52 sm:h-72 xl:w-64 xl:h-80 p-4 m-2",
      "bg-marvel-black/5 overflow-hidden",
      "before:absolute before:inset-0",
      "before:-translate-x-full before:animate-[shimmer_1s_infinite]",
      "before:bg-gradient-to-r before:from-transparent",
      "before:via-white/40 before:to-transparent before:z-50"
    );

    return isLoading ? (
      <div className={loadingClasses}></div>
    ) : (
      <Card
        key={id}
        title={name}
        truncate
        imagePriority={priority}
        image={thumbnail}
        {...(onClick && { onClick })}
        className="group grow w-32 sm:w-52 xl:w-64 select-none"
        footer={
          <p className="text-marvel-typo transition duration-200 font-normal text-sm group-hover:text-marvel-accent">
            + Informações
          </p>
        }
      />
    );
  }
);
