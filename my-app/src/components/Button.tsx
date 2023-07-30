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
        className={`mr-7 w-52 h-10 rounded-lg text-white text-16" ${
          disabled ? "bg-zinc-300 text-white" : "bg-zinc-600 text-white"
        }`}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
