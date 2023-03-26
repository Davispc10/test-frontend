import { Hero } from "@/features/heroes";
import React from "react";
import HeroCard from "./HeroCard";

const HeroList = ({ heroes }: { heroes: Hero[] }) => {
  return (
    <main className="grid min-h-screen grid-cols-5 gap-8 px-20 mt-8 place-content-start">
      {/* Hero list (hero card) */}
      {heroes.map((hero, i) => (
        <HeroCard hero={hero} key={i} />
      ))}
    </main>
  );
};

export default HeroList;
