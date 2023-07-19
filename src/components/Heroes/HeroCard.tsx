import React, { FC } from "react";
import { HeroProps } from "../../utils/interfaces";
import { marvelLogo } from "../../utils/utils";

export const HeroCard: FC<HeroProps> = ({ image, className, name }) => {
  const imageUrl: string = image.includes("not_available") ? marvelLogo : image;

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = marvelLogo;
  };

  return (
    <div className="w-full h-full">
      <div className={className}>
        <div>
          <img
            onError={handleImageError}
            src={`${imageUrl}.jpg`}
            className="h-32 w-32 xl:h-52 xl:w-52 mb-2 rounded-full border border-red-500"
            alt=""
          />
        </div>
        <div>
          <p className="text-xs xl:text-2xl xl:text-center font-semibold">{name}</p>
        </div>
      </div>
    </div>
  );
};
