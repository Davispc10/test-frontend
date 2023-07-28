import React from "react";
import { Comics } from "../Comics";
import HeroCard from "../molecules/HeroCard";

interface HeroMainInfoProps {
  name: string,
  image: string,
}

export const HeroMainInfo = ({...props}: HeroMainInfoProps) => {
  return (
    <div className="grid-row-2 p-4 rounded-md bg-red-800">
      <HeroCard name={props.name} image={props.image} textSize="text-xl" />
      <div className="flex justify-center items-center mt-4">
        <Comics />
      </div>
    </div>
  )
}