"use client";

import { twMerge } from "tailwind-merge";

export type FooterProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const Footer: React.FC<FooterProps> = ({
  className,
  children,
  ...rest
}) => {
  const classes = twMerge(
    "container flex flex-col justify-center items-center w-full mx-auto mt-20",
    className
  );

  return (
    <footer {...rest} className={classes}>
      {children}
    </footer>
  );
};
