import { Suspense } from "react";
import { PokemonListContent } from "@/presentation/components/pokemon-list-content";
import { LoadingSkeleton } from "@/presentation/components/loading-skeleton";
import { ITEMS_PER_PAGE } from "@/lib/constants";

export default function ListPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <Suspense fallback={<LoadingSkeleton count={ITEMS_PER_PAGE} />}>
        <PokemonListContent />
      </Suspense>
    </main>
  );
}
