import { Hero } from "@/features/heroes";
import React from "react";
import HeroCard from "./HeroCard";

const HeroList = ({ heroes }: { heroes: Hero[] }) => {
  return (
    <main className="flex flex-wrap items-center justify-center gap-4 p-4">
      {/* Hero list (hero card) */}
      {heroes.map((hero, i) => (
        <HeroCard hero={hero} key={i} />
      ))}
    </main>
  );
};

export default HeroList;
