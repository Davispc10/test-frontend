import React from "react";

interface HeroNameProps {
  name: string,
  textSize?: string,
}

export const HeroName = ({name, textSize} : HeroNameProps ) => {
  return (
    <div>
      <p className={`xl:text-2xl xl:text-center font-semibold ${textSize ? textSize : 'text-sm'}`}>
        {name}
      </p>
    </div>
  )
}