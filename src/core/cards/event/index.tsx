import Image from 'next/image'

import { Card } from './styles';

interface IDate {
  data: MarvelEventData
}

export default function CardEvent({ data }: IDate) {

  return (
    <Card>
      <figure>
        {data.thumbnail && <Image
          className='image'
          src={`${data.thumbnail.path.replace(/^http:\/\//i, "https://")}.${data.thumbnail.extension}`}
          alt={`Image of ${data.title}`}
          fill={true}
        />}
      </figure>
      <figcaption>
        <p>{data.title}</p>
        <p>Start At {data.start.split(" ")[0]}</p>
        <p>End At {data.end.split(" ")[0]}</p>
      </figcaption>
    </Card>
  )
}
