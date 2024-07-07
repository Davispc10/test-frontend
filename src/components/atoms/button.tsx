import type React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ children, onClick, ...props }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      {...props}
      className="flex items-center gap-1 rounded px-4 py-2 font-bold text-white enabled:hover:text-zinc-400 disabled:opacity-75"
    >
      {children}
    </button>
  );
}
