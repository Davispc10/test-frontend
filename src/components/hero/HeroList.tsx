import { Hero } from '@/features/heroes';
import React from 'react';
import HeroCard from './HeroCard';

const HeroList = ({ heroes }: { heroes: Hero[] }) => {
  return (
    <main className="flex gap-4 flex-wrap items-center justify-center p-4">
      {/* Hero list (hero card) */}
      {heroes.map((hero) => (
        <HeroCard hero={hero} key={hero.id} />
      ))}
    </main>
  );
};

export default HeroList;
