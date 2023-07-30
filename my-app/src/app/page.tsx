'use client'

import Navbar from "@/components/Navbar";
import CharactersList from "@/components/characters-list";

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
