"use client";

import { Button } from "@components/ui/button/button.component";

export type PaginationButtonProps = {
  icon?: React.ReactElement;
  label?: string | number;
  value: string | number;
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PaginationButton: React.FC<PaginationButtonProps> = ({
  label,
  icon,
  value,
  active,
  ...rest
}) => {
  return (
    <Button
      variant={active ? "primary" : "default"}
      {...rest}
      shape="circle"
      {...(icon && { icon })}
    >
      {label || value}
    </Button>
  );
};
