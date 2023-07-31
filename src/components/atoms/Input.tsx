import { InputHTMLAttributes, ReactNode } from 'react'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
}

export function Input({ icon, ...props }: IInput) {
  return (
    <div
      className="focus-within:text-zinc-900' }
      mt-1 flex w-full items-center gap-1 rounded-lg border-2 bg-zinc-100 px-4 py-1 text-zinc-900 focus-within:border-red-500"
    >
      {icon}
      <input
        {...props}
        className="w-full border-none bg-transparent text-zinc-900 caret-red-500 outline-current focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:text-zinc-500/80"
      />
    </div>
  )
}
