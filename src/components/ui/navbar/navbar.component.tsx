"use client";

import { twMerge } from "tailwind-merge";

export type NavbarProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const Navbar: React.FC<NavbarProps> = ({
  className,
  children,
  ...rest
}) => {
  const classes = twMerge(
    "relative flex flex-wrap justify-center items-center w-full p-4 bg-white border-b-2 border-gray-200",
    className
  );

  return (
    <nav {...rest} className={classes}>
      {children}
    </nav>
  );
};
