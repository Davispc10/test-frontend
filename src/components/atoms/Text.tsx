import clsx from "clsx"

type Props = {
  text: string
  variant?: "header" | "footer"
  bold: boolean
}

export function Text({ text, variant = "header", bold }: Props) {
  return (
    <p
      className={clsx(
        { "text-zinc-300": variant === "header" },
        { "text-xs text-red-700": variant === "footer" },
        { "font-bold": bold },
      )}
    >
      {text}
    </p>
  )
}
