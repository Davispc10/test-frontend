import { Hero } from '@/features/heroes';
import React from 'react';

const HeroCard = ({ hero }: { hero: Hero }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg">
      <img
        src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
        alt={hero.name}
        className="w-full h-96 object-cover rounded-lg"
      />
    </div>
  );
};

export default HeroCard;
