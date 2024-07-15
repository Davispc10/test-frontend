import clsx from "clsx"
import Image from "next/image"

type Props = {
  thumbnail: string
  isButton?: boolean
}

export function CharacterImage({ thumbnail, isButton = true }: Props) {
  return (
    <Image
      src={thumbnail}
      loading="lazy"
      alt="hero image"
      fill
      objectFit="cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={clsx({
        "z-0 rounded-t-3xl object-cover peer-hover:scale-105 peer-hover:shadow-lg peer-hover:shadow-red-600 hover:scale-105 hover:shadow-lg hover:shadow-red-600 hover:transition-all":
          isButton,
      })}
    />
  )
}
