'use client'

import Image from 'next/image'

export type CharacterProps = {
  name: string
  thumbnail: string
}

export default function Character({ name, thumbnail, ...props }: CharacterProps) {
  const handleClick = () => {
    const detail = {
      name: name,
      thumbnail: thumbnail,
      comics: props.comics.collectionURI,
      description: props.description
        ? props.description
        : 'description not specified',
      series: {
        available: props.series.available,
        items: props.series.items
          .map(({ name }: { name: string }) => name)
      },
      stories: {
        available: props.stories.available,
        items: props.stories.items
          .map(({ name }: { name: string }) => name)
      },
      events: {
        available: props.events.available,
        items: props.events.items
          .map(({ name }: { name: string }) => name)
      },
      urls: props.urls,
    }

    localStorage.setItem('detail', JSON.stringify(detail))

    window.location.href = '/detail'
  }

  return (
    <div className="character" onClick={handleClick}>
      <div
        className="character-thumbnail w-full h-full"
      >
        <Image
          src={thumbnail}
          alt={name}
          priority
          fill
        />
      </div>

      <p className="character-name">{name}</p>
    </div>
  )
}
