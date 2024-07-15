import Image from "next/image"
import marvelLogo from "@/assets/marvel_logo.png"

type Props = {
  height?: number
}

export function MarvelLogo({ height = 70 }: Props) {
  return <Image src={marvelLogo} alt="marvel logo" height={height} />
}
