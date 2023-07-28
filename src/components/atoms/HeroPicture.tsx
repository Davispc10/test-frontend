import React from "react";
import { handleImageError, imageUrl } from "../../utils/utils";

interface HeroPictureProps {
  source?: string,
}
export const HeroPicture = ({source} : HeroPictureProps) => {
  const src = imageUrl(source!);
  
  return (
    <picture>
      <img
        onError={handleImageError}
        src={`${src}.jpg`}
        className="h-32 w-32 xl:h-52 xl:w-52 mb-2 rounded-full border border-black"
        alt=""
      />
    </picture>
  )
}