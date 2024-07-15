import clsx from "clsx"

type Props = {
  number?: number
  active?: boolean
}

export function PaginationNumber({ number, active = false }: Props) {
  return (
    <span
      className={clsx(
        "flex h-6 w-6 items-center justify-center",
        { "rounded-full bg-red-600": active },
        { "text-zinc-500": !number },
      )}
    >
      {number || "..."}
    </span>
  )
}
