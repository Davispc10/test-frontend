"use client";

import { twMerge } from "tailwind-merge";
import LinkNext, { LinkProps as LinkNextProps } from "next/link";

export type LinkProps = {
  target?: React.HTMLAttributeAnchorTarget;
} & LinkNextProps &
  React.HTMLAttributes<HTMLAnchorElement>;

export const Link: React.FC<LinkProps> = ({ className, children, ...rest }) => {
  const classes = twMerge(
    "text-blue-400 transition ease-in-out duration-200 hover:underline",
    className
  );

  return (
    <LinkNext {...rest} className={classes}>
      {children}
    </LinkNext>
  );
};
