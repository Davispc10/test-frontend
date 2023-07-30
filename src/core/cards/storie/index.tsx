import Image from 'next/image'

import { Card } from './styles';

interface IDate {
  data: MarvelComic
}

export default function CardStorie({ data }: IDate) {

  return (
    <Card>
      <p>{data.title}</p>
    </Card>
  )
}
