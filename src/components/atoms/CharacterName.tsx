type Props = {
  name: string
}

export function CharacterName({ name }: Props) {
  return (
    <p className="peer relative z-10 flex h-10 w-full items-center justify-center overflow-hidden bg-black/70 pb-2 pt-2 text-center text-xs text-zinc-50 duration-300 group-hover:h-20 group-hover:bg-black/90 group-hover:duration-300">
      {name}
    </p>
  )
}
