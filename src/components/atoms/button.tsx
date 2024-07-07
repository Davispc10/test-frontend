interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ children, onClick, ...props }: ButtonProps) {
  return (
    <button onClick={onClick} {...props} className="text-white font-bold flex items-center gap-1 py-2 px-4 rounded disabled:opacity-75 hover:text-zinc-400">
      {children}
    </button>
  )
}