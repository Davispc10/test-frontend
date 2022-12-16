"use client";

import { BaseComponentProps } from "@components/types";
import clsx from "clsx";
import React, { forwardRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonProps = {
  iconSufix?: React.ReactElement;
  iconPrefix?: React.ReactElement;
  icon?: React.ReactElement;
  as?: React.ReactElement;
} & BaseComponentProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonElement: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = (
  {
    className,
    children,
    size = "medium",
    variant = "filled",
    colorStyle = "primary",
    shape = "rounded",
    iconPrefix,
    iconSufix,
    icon,
    disabled,
    as,
    ...rest
  },
  ref
) => {
  const classes = twMerge(
    "relative flex flex-row flex-nowrap items-center justify-center space-x-2",
    clsx({
      "border-2": variant === "outlined",

      // Size small
      "px-2 py-2 text-sm": size === "small" && !icon,
      "px-1 py-1 w-6 h-6": size === "small" && !!icon,

      // Size medium
      "px-4 py-2": size === "medium" && !icon,
      "px-2 py-2": size === "medium" && !!icon,

      // Shape
      "rounded-lg": shape === "rounded",
      "rounded-full": shape === "circle",

      // Variant/Color Default
      "bg-transparent text-marvel-typo hover:bg-marvel-black/5":
        colorStyle === "default" && !disabled && variant === "filled",
      "border-marvel-black/50 text-marvel-typo hover:bg-marvel-black/5":
        colorStyle === "default" && !disabled && variant === "outlined",
      "bg-marvel-black/5 text-marvel-typo/20":
        colorStyle === "default" && disabled,

      // Variant/Color Primary
      "bg-marvel-primary text-marvel-white hover:brightness-110":
        colorStyle === "primary" && !disabled && variant === "filled",
      "border-marvel-primary bg-marvel-white text-marvel-primary hover:bg-marvel-primary hover:text-marvel-white":
        colorStyle === "primary" && !disabled && variant === "outlined",
      "bg-marvel-primary/20 text-marvel-typo":
        colorStyle === "primary" && disabled,

      // Variant/Color Secondary
      "bg-marvel-secondary text-marvel-white hover:brightness-110":
        colorStyle === "secondary" && !disabled && variant === "filled",
      "border-marvel-secondary bg-marvel-white text-marvel-secondary hover:bg-marvel-secondary hover:text-marvel-white":
        colorStyle === "secondary" && !disabled && variant === "outlined",
      "bg-marvel-secondary/20 text-marvel-typo":
        colorStyle === "secondary" && disabled,
    }),
    "transition duration-200 ease-in-out",
    className
  );

  const content = useMemo(
    () =>
      icon ? (
        icon
      ) : (
        <>
          {iconPrefix && <span className="h-full w-auto">{iconPrefix}</span>}
          <span className="">{children}</span>
          {iconSufix && <span className="h-full w-auto">{iconSufix}</span>}
        </>
      ),
    [children, icon, iconPrefix, iconSufix]
  );

  if (as)
    return React.cloneElement(as, {
      disabled,
      className: classes,
      children: content,
    });

  return (
    <button ref={ref} {...rest} disabled={disabled} className={classes}>
      {content}
    </button>
  );
};

export const Button = forwardRef(ButtonElement);
