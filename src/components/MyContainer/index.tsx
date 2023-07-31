import React from "react";
import { tv } from "tailwind-variants";

interface MyContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const containerStyle = tv({
  base: "px-4 py-4 max-w-7xl m-auto",
});

export default function MyContainer({
  children,
  className,
  ...props
}: MyContainerProps) {
  return (
    <div className={containerStyle({ className })} {...props}>
      {children}
    </div>
  );
}
