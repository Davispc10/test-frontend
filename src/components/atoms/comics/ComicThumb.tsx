import React from "react";
import Image from "next/image";
import { imagePathValidation } from "@/libs/ImagePathValidation";

const ComicThumb = ({
  comicTitle,
  extension,
  path,
}: {
  path?: string;
  extension?: string;
  comicTitle: string;
}) => {
  return (
    <Image
      className="aspect-square object-cover w-64"
      src={imagePathValidation(path, extension)}
      width={1920}
      height={1080}
      alt={`Foto da comic: ${comicTitle}`}
    />
  );
};

export default ComicThumb;
