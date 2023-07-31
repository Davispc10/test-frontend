import { InputHTMLAttributes, ReactNode } from 'react'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  error?: boolean
}

export function Input({ icon, error, ...rest }: IInput) {
  return (
    <div
      className={`${
        error
          ? 'border-red-700 focus-within:text-red-700'
          : 'focus-within:border-blue-500 focus-within:text-blue-500'
      } mt-1 flex w-full items-center gap-1 rounded-lg border-2 bg-slate-50 px-4 py-1 text-zinc-900 `}
    >
      {icon}
      <input
        {...rest}
        className="text-accent w-full border-none bg-transparent caret-blue-500 outline-current focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:text-slate-500/80"
      />
    </div>
  )
}
