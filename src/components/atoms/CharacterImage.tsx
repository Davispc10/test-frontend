import Image from "next/image"

type Props = {
  thumbnail: {
    path: string
    extension: string
  }
}

export function CharacterImage({ thumbnail }: Props) {
  return (
    <Image
      src={thumbnail.path + "." + thumbnail.extension}
      loading="lazy"
      alt="hero image"
      fill
      className="z-0 rounded-t-3xl object-cover hover:shadow-lg hover:shadow-red-600 hover:transition-all peer-hover:shadow-lg peer-hover:shadow-red-600"
    />
  )
}
