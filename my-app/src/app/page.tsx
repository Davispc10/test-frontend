"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import CharactersList from "@/components/characters-list";
import { queryClient } from "@/services/queryClient";

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <div>
          <h1 className="font-title text-7xl flex justify-center my-28">
            Marvel Characters
          </h1>
          <CharactersList />
        </div>
      </main>
    </QueryClientProvider>
  );
}
