import React from "react";
import { CircleNotch } from "@phosphor-icons/react";
import { tv } from "tailwind-variants";

interface LoadSpinnerProps {
  className?: string;
  size?: number;
}

export default function LoadSpinner({
  className,
  size = 32,
}: LoadSpinnerProps) {
  return (
    <CircleNotch
      size={size}
      className={tv({ base: "animate-spin fill-red-500" })(className)}
    />
  );
}
