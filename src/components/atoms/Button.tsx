import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  text: string;
}

export const Button = ({ onClick, text, ...rest }: Props) => {
  return (
    <button onClick={onClick} {...rest}>
      {text}
    </button>
  );
};