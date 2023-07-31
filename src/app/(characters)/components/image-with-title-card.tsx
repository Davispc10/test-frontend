import Image from 'next/image'

import { cn } from '@/utils'

type ImageWithTitleCardProps = {
  title: string
  thumbnail: string
}

export const ImageWithTitleCard = ({
  title,
  thumbnail,
}: ImageWithTitleCardProps) => {
  return (
    <div className="group relative max-w-full transition-colors">
      <div className="overflow-hidden">
        <figure className="relative h-52 animate-placeholder-image-shimmer overflow-hidden bg-image-placeholder after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-secondary">
          <Image
            className="block h-full w-full scale-100 overflow-hidden object-cover object-[top_center] transition-all ease-linear group-hover:scale-105"
            src={thumbnail}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            priority
          />
        </figure>
      </div>

      <div
        className={cn(
          'relative z-30 h-36 overflow-hidden bg-gray-900 p-4 transition-colors duration-300',
          'before:absolute before:bottom-full before:left-0 before:-z-[1] before:h-full before:w-full before:transform before:bg-secondary before:transition-transform before:duration-300 before:group-hover:translate-y-full',
          'after:absolute after:bottom-0 after:right-0 after:z-40 after:border-r-[12px] after:border-t-[12px] after:border-r-background after:border-t-transparent',
        )}
      >
        <p className="text-sm font-semibold uppercase tracking-[1px] text-white">
          {title}
        </p>
      </div>
    </div>
  )
}
