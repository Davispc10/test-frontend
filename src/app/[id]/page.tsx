import { getCharacter } from '@/services/characters/charactersService'
import { getCharacterImagePath } from '@/utils/getCharacterImagePath/getCharacterImagePath'
import Image from 'next/image'

export interface HeroPropsSchema {
  params: {
    id: string
  }
}

export default async function Hero({ params }: HeroPropsSchema) {
  const { data } = await getCharacter({ id: params.id })

  if (!data) return <div>i</div>

  const character = data.results[0]

  const characterInfos: CharacterInfoPropsSchema[] = [
    {
      title: 'Histórias',
      items: character.stories.items
    },
    {
      title: 'Quadrinhos',
      items: character.comics.items
    },
    {
      title: 'Séries',
      items: character.series.items
    }
  ]

  const thumbnailPath = `${character.thumbnail.path}.${character.thumbnail.extension}`

  const characterThumbnail = getCharacterImagePath({ thumbnailPath })

  return (
    <div className="flex justify-between text-white">
      <Image
        height={800}
        width={400}
        src={characterThumbnail}
        alt={character.name}
        className="h-96 w-72  bg-gray-950 object-cover "
      />
      <div className="flex max-w-3xl flex-col gap-3">
        <h1 className="text-3xl font-bold">{character.name}</h1>
        <p>{character.description}</p>

        <div className="flex flex-col gap-3">
          {characterInfos.map((characterInfo) => (
            <CharacterInfo
              key={characterInfo.title}
              items={characterInfo.items}
              title={characterInfo.title}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export interface CharacterInfoPropsSchema {
  title: string
  items: {
    name: string
    resourceURI: string
  }[]
}

export const CharacterInfo = ({
  items,

  title
}: CharacterInfoPropsSchema) => {
  return (
    <div>
      <h2 className="relative w-max text-xl before:absolute before:bottom-1 before:h-[2px] before:w-full before:bg-purple-500  ">
        {title}
      </h2>

      <ul className="mt-2 flex flex-col gap-2 px-5">
        {items.map((item) => (
          <li key={item.name} className="list-disc">
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
