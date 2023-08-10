'use client'

import CharactersList from "components/CharacterList";
import Navbar from "components/Navbar";

export default function Home() {
  return (
    <main>
      <div>
        <Navbar />
        <div className="pt-48	">
          <CharactersList />
        </div>
      </div>
    </main>
  );
}
