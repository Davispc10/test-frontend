"use client";

import { BaseComponentProps } from "@components/types";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export type ButtonProps = {
  iconSufix?: React.ReactElement;
  iconPrefix?: React.ReactElement;
  icon?: React.ReactElement;
} & BaseComponentProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  size = "medium",
  variant = "primary",
  shape = "rounded",
  iconPrefix,
  iconSufix,
  icon,
  ...rest
}) => {
  const classes = twMerge(
    "relative flex flex-grow flex-row flex-nowrap items-center justify-center space-x-2",
    clsx({
      //Size
      "px-4 py-2": size === "medium" && !icon,
      "px-2 py-2": size === "medium" && !!icon,

      // Shape
      "rounded-md": shape === "rounded",
      "rounded-full": shape === "circle",

      // Variant
      "bg-marvel-primary text-marvel-white": variant === "primary",
    }),
    className
  );

  return (
    <button {...rest} className={classes}>
      {icon ? (
        icon
      ) : (
        <>
          {iconPrefix && <span className="h-full w-auto">{iconPrefix}</span>}
          <span className="grow">{children}</span>
          {iconSufix && <span className="h-full w-auto">{iconSufix}</span>}
        </>
      )}
    </button>
  );
};
