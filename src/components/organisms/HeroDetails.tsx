import React from "react";
import { useDispatch } from "react-redux";
import { addHero, removeHero } from "../../features/HeroSlice";
import { HeroMainInfo } from "./HeroMainInfo";

import { HeroDescription } from "../atoms/HeroDescription";
import { BackButton } from "../molecules/BackButton";
import { FavHeroButton } from "../molecules/FavHeroButton";
import { Toaster } from "react-hot-toast";

interface HeroDetailsProps {
  name: string,
  image: string,
  description: string
  id: number,
}

export const HeroDetails = ({...props} : HeroDetailsProps) => {
  const dispatch = useDispatch();
  
  const favHero = () => {
    dispatch(addHero({
      name: props.name, 
      image: props.image, 
      id: props.id,
    }))
  }

  const unfavHero = () => {
    dispatch(removeHero({
      name: props.name, 
      image: props.image, 
      id: props.id,
    }))
  }

  return (
    <div className="grid h-full border-4 border-black rounded-md bg-red-900">
      <Toaster position="bottom-center" reverseOrder={false} />
      <HeroMainInfo name={props.name} image={props.image} />
      <HeroDescription description={props.description!} />
      <BackButton />
      <div className="flex w-full justify-around">
        <FavHeroButton isFavIcon={true} onClick={favHero} />
        <FavHeroButton isFavIcon={false} onClick={unfavHero} />
      </div>

    </div>
  )
}