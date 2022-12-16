"use client";

import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export type CardProps = {
  image?: StaticImageData | string;
  imagePriority?: boolean;
  title: string;
  footer?: React.ReactElement;
  truncate?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const Card: React.FC<CardProps> = ({
  image,
  imagePriority = false,
  title,
  className,
  footer,
  truncate = false,
  ...rest
}) => {
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    return () => {
      setImageLoading(false);
    };
  }, []);

  const classes = twMerge(
    "flex flex-wrap justify-center w-72 h-auto min-h-10 items-center p-4 shadow-lg rounded-lg m-2 cursor-pointer bg-white",
    "transition duration-300 ease-in-out transform hover:translate-y-1",
    className
  );

  const titleClasses = twMerge(
    "text-lg text-marvel-typo font-medium w-full text-center my-2",
    clsx({
      truncate: truncate,
    })
  );

  const parentImageClasses = useMemo(
    () =>
      twMerge(
        "relative overflow-hidden w-full rounded-lg aspect-square bg-white",
        clsx({
          [twMerge(
            "bg-marvel-black/5 overflow-hidden",
            "before:absolute before:inset-0",
            "before:-translate-x-full before:animate-[shimmer_1s_infinite]",
            "before:bg-gradient-to-r before:from-transparent",
            "before:via-white/40 before:to-transparent before:z-50"
          )]: imageLoading,
        })
      ),
    [imageLoading]
  );

  return (
    <div {...rest} className={classes}>
      {image && (
        <div className={parentImageClasses}>
          <Image
            src={image}
            alt={`${title}`}
            priority={imagePriority}
            width={300}
            height={300}
            onLoadingComplete={() => {
              setImageLoading(false);
            }}
            className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-[unset] w-full object-fill"
          />
        </div>
      )}

      <h3 className={titleClasses}>{title}</h3>

      {footer}
    </div>
  );
};
