import Image from 'next/image'

import { Card } from './styles';

interface IDate {
  data: MarvelComic
}

export default function CardSerie({ data }: IDate) {

  return (
    <Card>
      <figure>
        {data.thumbnail ? <Image
          className='image'
          src={`${data.thumbnail.path.replace(/^http:\/\//i, "https://")}.${data.thumbnail.extension}`}
          alt={`Image of ${data.title}`}
          fill={true}
        /> : "423425123"}
      </figure>
      <figcaption>
        <p>{data.title}</p>
      </figcaption>
    </Card>
  )
}
