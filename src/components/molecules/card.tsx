import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/marvel_not_found.png';
import { CardTitle } from '../atoms/card-title';
import { rgbDataURL } from '@/utils/rgbcreate';

type CardProps = {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: 'jpg' | 'png';
  };
};

export function Card({ thumbnail, id, name }: CardProps) {
  const image = thumbnail.path.includes('image_not_available')
    ? logo
    : `${thumbnail.path}.${thumbnail.extension}`;

  return (
    <Link
      data-cy="card"
      href={`/character/${id}`}
      className="relative h-96 w-full overflow-hidden rounded-sm"
    >
      <CardTitle name={name} />
      <Image
        priority
        blurDataURL={rgbDataURL(236, 29, 36)}
        placeholder="blur"
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform hover:scale-[1.05] hover:opacity-75"
      />
    </Link>
  );
}
