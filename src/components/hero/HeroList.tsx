import { Hero } from "@/features/heroes";
import React from "react";
import HeroCard from "./HeroCard";

const HeroList = ({ heroes }: { heroes: Hero[] }) => {
  return (
    <main className="grid grid-cols-1 gap-8 px-10 py-8 lg:px-20 lg:grid-cols-5 place-content-start">
      {/* Hero list (hero card) */}
      {heroes.map((hero, i) => (
        <HeroCard hero={hero} key={i} />
      ))}
    </main>
  );
};

export default HeroList;
