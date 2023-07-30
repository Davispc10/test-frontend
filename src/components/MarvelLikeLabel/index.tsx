import { anton } from "@/styles/fonts";
import React from "react";
import { tv } from "tailwind-variants";

interface MarvelLikeLabelProps {
  children: React.ReactNode;
  className?: string;
}

const labelStyle = tv({
  base: `
  text-[#F7F502]
  `,
});

export default function MarvelLikeLabel({
  children,
  className,
}: MarvelLikeLabelProps) {
  return (
    <h3
      className={labelStyle({ className: `${className} ${anton.className}` })}
      style={{
        textShadow: "2px -2px red",
      }}
    >
      {children}
    </h3>
  );
}
