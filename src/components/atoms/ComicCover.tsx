import React from "react";

interface ComicCoverProps {
  cover: string,
}

export const ComicCover = ({cover} : ComicCoverProps) => {
  return (
    <picture>
      <img 
        className="h-24 w-12 xs:h-28 xs:w-16 mr-2 rounded-sm border-2 border-slate-800 hover:border-red-500 duration-300"                 
        src={`${cover}.jpg`}
        alt='' 
      />            
    </picture>
  )
}