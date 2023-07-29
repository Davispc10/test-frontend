import React from "react";

interface HeroDescriptionProps {
  description: string,
}

export const HeroDescription = ({description} : HeroDescriptionProps) => {
  return (
    <p className="grid-row-1 border-y-2 border-black bg-red-500 p-6 rounded-md grid place-items-center text-center">      
      {description}      
    </p>
  )
}