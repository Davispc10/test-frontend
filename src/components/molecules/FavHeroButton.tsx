import React from "react";
import { Star, Trash } from "@phosphor-icons/react";

interface FavHeroButtonProps {
  isFavIcon: boolean
  onClick: () => void
}

export const FavHeroButton = ({onClick, isFavIcon} : FavHeroButtonProps) => {
  return (
    <div className="flex flex-col justify-self-center justify-center items-center group cursor-pointer" onClick={onClick}>
      {isFavIcon ? (
        <div className="flex flex-col justify-center items-center">
          <Star className="text-xl group-hover:text-yellow-500 justify-self-center duration-300" />
          <p className="text-sm group-hover:text-yellow-500 duration-300">
            Fav hero!
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <Trash className="text-xl group-hover:text-red-500 justify-self-center duration-300" />
          <p className="text-sm group-hover:text-red-500 duration-300">
            Remove hero!
          </p>
        </div>
      )}
    </div>
  )
}