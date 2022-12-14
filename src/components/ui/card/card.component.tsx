"use client";

import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";

export type CardProps = {
  image?: StaticImageData | string;
  title: string;
  footer?: React.ReactElement;
  truncate?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const Card: React.FC<CardProps> = ({
  image,
  title,
  className,
  footer,
  truncate = false,
  ...rest
}) => {
  const classes = twMerge(
    "flex flex-wrap justify-center w-72 h-auto min-h-10 items-center p-4 shadow-lg rounded-lg m-2 cursor-pointer bg-white",
    "transition duration-300 ease-in-out transform hover:translate-y-1",
    className
  );

  const titleClasses = twMerge(
    "text-lg text-gray-500 font-medium w-full text-center my-2",
    clsx({
      truncate: truncate,
    })
  );

  return (
    <div {...rest} className={classes}>
      {image && (
        <div className="overflow-hidden w-full rounded-lg aspect-square">
          <Image
            src={image}
            alt={`${title}`}
            width={300}
            height={300}
            className="w-full h-full"
          />
        </div>
      )}

      <h3 className={titleClasses}>{title}</h3>

      {footer}
    </div>
  );
};
