import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Character {
  id: number;
  name: string;
  thumbnail: string;
}

interface CharacterListProps {
  characters: Character[];
}

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {characters.map((character) => (
        <Link href={`/character/${character.id}`} key={character.id}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-40 sm:h-48">
              <Image
                src={character.thumbnail}
                alt={character.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-2">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 truncate">{character.name}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CharacterList;