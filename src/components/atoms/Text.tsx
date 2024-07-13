import clsx from "clsx"

type Props = {
  text: string
  variant?: "header" | "footer"
}

export function Text({ text, variant = "header" }: Props) {
  return (
    <p
      className={clsx(
        { "text-zinc-300": variant === "header" },
        { "text-xs text-red-700": variant === "footer" },
      )}
    >
      {text}
    </p>
  )
}
