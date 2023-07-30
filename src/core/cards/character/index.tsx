import Image from 'next/image'

import Navigator from "@/utils/navigator"
import { Card } from './styles';

interface IDate {
  data: MarvelCharacter
}

export default function CardHeroes({ data }: IDate) {

  return (
    <Navigator title={`Open the page of ${data.name}`} href={`/character/${data.id}`}>
      <Card>
        <figure>
          <Image
            className='image'
            src={`${data.thumbnail.path.replace(/^http:\/\//i, "https://")}.${data.thumbnail.extension}`}
            alt={`Image of ${data.name}`}
            fill={true}

          />
        </figure>
        <figcaption>
          {data.name}
        </figcaption>
      </Card>
    </Navigator>
  )
}
