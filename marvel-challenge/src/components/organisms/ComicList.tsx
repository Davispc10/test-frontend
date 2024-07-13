
import React from 'react';
import Image from 'next/image';

interface Comic {
  id: number;
  title: string;
  thumbnail: string;
}

interface ComicListProps {
  comics: Comic[];
}

const ComicList: React.FC<ComicListProps> = ({ comics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {comics.map((comic) => (
        <div key={comic.id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <Image
            src={comic.thumbnail}
            alt={comic.title}
            width={200}
            height={300}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2 truncate">{comic.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComicList;