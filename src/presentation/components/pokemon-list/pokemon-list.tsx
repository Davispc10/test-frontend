import type { IPokemonListItem } from "@/domain/entities/pokemon";
import { PokemonCard } from "@/presentation/components/pokemon-card";

interface PokemonListProps {
  items: IPokemonListItem[];
}

export function PokemonList({ items }: PokemonListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
      {items.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
