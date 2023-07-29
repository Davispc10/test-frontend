import React from "react";
import { HeroDescription } from "../atoms/HeroDescription";
import { HeroMainInfo } from "./HeroMainInfo";
import { BackButton } from "../molecules/BackButton";

interface HeroDetailsProps {
  name: string,
  image: string,
  description: string
}

export const HeroDetails = ({...props} : HeroDetailsProps) => {
  return (
    <div className="grid h-full border-4 border-black rounded-md bg-red-900">
      <HeroMainInfo name={props.name} image={props.image} />
      <HeroDescription description={props.description!} />
      <BackButton />
    </div>
  )
}