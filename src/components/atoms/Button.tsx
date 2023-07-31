import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  icon?: ReactNode
}

export function Button({ text, icon, ...props }: ButtonProps) {
  return (
    <button
      className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 hover:bg-red-700"
      {...props}
    >
      {icon}
      <span>{text}</span>
    </button>
  )
}
