import { anton } from "@/styles/fonts";
import React from "react";
import { tv } from "tailwind-variants";
import MarvelLikeLabel from "../MarvelLikeLabel";

interface ErrorInfoProps {
  errorMessage?: string;
}

const errorStyle = tv({
  base: `
    text-7xl
  `,
});

export default function ErrorInfo({
  errorMessage = "something went wrong!",
}: ErrorInfoProps) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <MarvelLikeLabel className={errorStyle()}>OOPS!</MarvelLikeLabel>
      <p className="text-3xl">{errorMessage}</p>
    </div>
  );
}
