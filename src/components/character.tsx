'use client'

import Image from 'next/image'

export type CharacterProps = {
  name: string
  thumbnail: string
}

export default function Character({ name, thumbnail }: CharacterProps) {
  const handleClick = () => {
    console.log('name', name)
  }

  return (
    <button className="character" onClick={handleClick}>
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
    </button>
  )
}
