import React from 'react';
import CustomImage from '../atoms/Image';

interface ComicCardProps {
  id: number;
  title: string;
  thumbnail: string;
}

const ComicCard: React.FC<ComicCardProps> = ({ id, title, thumbnail }) => {
  return (
    <div className="border rounded p-4">
      <CustomImage
        src={thumbnail}
        alt={title}
        width={150}
        height={225}
      />
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
    </div>
  );
};

export default ComicCard;