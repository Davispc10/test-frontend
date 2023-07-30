import Image from 'next/image'

import { Card } from './styles';

interface IDate {
  data: MarvelComic
}

export default function CardComic({ data }: IDate) {

  return (
    <Card>
      <figure>
        <Image
          className='image'
          src={`${data.thumbnail.path.replace(/^http:\/\//i, "https://")}.${data.thumbnail.extension}`}
          alt={`Image of ${data.title}`}
          fill={true}

        />
      </figure>
      <figcaption>
        <p>{data.title}</p>
        {/* <hr /> */}
        <p className='description'>{data.description}</p>
      </figcaption>
    </Card>
  )
}
