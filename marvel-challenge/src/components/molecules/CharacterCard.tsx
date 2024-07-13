import React from 'react';
import Link from 'next/link';
import CustomImage from '../atoms/Image';

interface CharacterCardProps {
  id: number;
  name: string;
  thumbnail: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ id, name, thumbnail }) => {
  return (
    <Link href={`/character/${id}`}>
      <div className="border rounded p-4 hover:shadow-lg transition">
        <CustomImage
          src={thumbnail}
          alt={name}
          width={200}
          height={200}
        />
        <h2 className="mt-2 text-xl font-bold">{name}</h2>
      </div>
    </Link>
  );
};

export default CharacterCard;