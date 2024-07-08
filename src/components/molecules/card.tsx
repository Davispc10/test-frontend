import Image from 'next/image';

import { Description } from '../atoms/description';
import { NoDescription } from '../atoms/no-description';
import { Title } from '../atoms/title';
import Link from 'next/link';

type CardProps = {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: 'jpg' | 'png';
  };
};

export function Card({ thumbnail, description, id, name }: CardProps) {
  return (
    <Link
      href={`/character/${id}`}
      className="relative flex aspect-square h-full w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-sm bg-dark-700 p-5"
    >
      <Image
        src={`${thumbnail.path}.${thumbnail.extension}`}
        alt={name}
        objectFit="contain"
        width={200}
        height={120}
        className="mb-8"
      />
      <Title text={name} />
      {description.length > 0 ? <Description text={description} /> : <NoDescription />}
    </Link>
  );
}
