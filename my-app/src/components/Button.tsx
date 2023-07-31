import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  disabled: boolean;
  text: string;
}
function Button({ onClick, disabled, text }: ButtonProps) {
  return (
    <div>
      <button
        onClick={() => onClick()}
        disabled={disabled}
        className={`mr-2 lg:mr-7 px-10 lg:px-16 cursor-pointer h-10 rounded-lg text-white text-16" ${
          disabled ? "bg-zinc-300 text-white" : "bg-zinc-600 text-white"
        }`}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
