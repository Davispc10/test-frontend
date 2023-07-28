import React from "react";

interface HeroNameProps {
  name: string,
}

export const HeroName = ({name} : HeroNameProps ) => {
  return (
    <div>
      <p className="text-xs xl:text-2xl xl:text-center font-semibold">
        {name}
      </p>
    </div>
  )
}