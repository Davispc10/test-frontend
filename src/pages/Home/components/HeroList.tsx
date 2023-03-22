import { Hero } from '@/features/heroes';
import React from 'react';
import HeroCard from './HeroCard';

const HeroList = ({ heroes }: { heroes: Hero[] }) => {
  return (
    <main className="flex gap-4 flex-wrap items-center px-8 justify-center">
      {/* Hero list (hero card) */}
      {heroes.map((hero) => (
        <HeroCard hero={hero} key={hero.id} />
      ))}
    </main>
  );
};

export default HeroList;
