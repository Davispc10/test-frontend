import Image from 'next/image';
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

export function Card({ thumbnail, id, name }: CardProps) {
  return (
    <Link href={`/character/${id}`} className="relative h-96 w-full overflow-hidden rounded-sm">
      <div className="absolute z-10 bg-red-500">
        <h3 className="px-4 text-sm font-bold">{name}</h3>
      </div>
      <Image
        src={`${thumbnail.path}.${thumbnail.extension}`}
        alt={name}
        objectFit="cover"
        fill
        className="transition-transform hover:scale-[1.05] hover:opacity-75"
      />
    </Link>
  );
}
