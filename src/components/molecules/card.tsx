import Image from "next/image"

import { Description } from "../atoms/description"
import { NoDescription } from "../atoms/no-description"
import { Title } from "../atoms/title"

type CardProps = {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: 'jpg' | 'png'
  }
}

export function Card({ thumbnail, description, id, name }: CardProps) {
  return (
    <div className="flex-col relative aspect-square h-full w-full overflow-hidden gap-4 bg-dark-700 p-5 flex items-center justify-center rounded-sm">
      <Image
        src={`${thumbnail.path}.${thumbnail.extension}`}
        alt={name}
        objectFit="contain"
        width={200}
        height={120}
        className="mb-8"
      />
      <Title text={name} />
      {description.length > 0 ? <Description text={description} /> : <NoDescription />}
    </div>
  )
}