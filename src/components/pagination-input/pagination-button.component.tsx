"use client";
import { Button } from "@components/ui/button/button.component";
import { forwardRef, useRef } from "react";

export type PaginationButtonProps = {
  icon?: React.ReactElement;
  label?: string | number;
  value: string | number;
  active?: boolean;
  groupInit?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const PaginationButtonElement: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  PaginationButtonProps
> = (
  { label, icon, value, active = false, groupInit = false, ...rest },
  ref
) => {
  return (
    <Button
      ref={ref}
      colorStyle={active ? "primary" : groupInit ? "secondary" : "default"}
      shape="rounded"
      variant={active ? "filled" : groupInit ? "outlined" : "filled"}
      {...(icon && { icon })}
      {...rest}
    >
      {label || value}
    </Button>
  );
};

export const PaginationButton = forwardRef(PaginationButtonElement);
