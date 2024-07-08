import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/marvel_not_found.png';
import { CardTitle } from '../atoms/card-title';

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
    <Link href={`/character/${id}`} className="relative h-96 w-full overflow-hidden rounded-sm">
      <CardTitle name={name} />
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform hover:scale-[1.05] hover:opacity-75"
      />
    </Link>
  );
}
