"use client";

import { usePokemonStore } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { usePokemons } from "@/hooks/usePokemonQuery";
import { CharacterCard } from "./character-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function CharacterList() {
    const { searchQuery, minId, maxId, typeFilters, rarityFilter } = usePokemonStore(
        useShallow((state) => ({
            searchQuery: state.searchQuery,
            minId: state.minId,
            maxId: state.maxId,
            typeFilters: state.typeFilters,
            rarityFilter: state.rarityFilter,
        }))
    );
    const [page, setPage] = useState(1);
    const { data, isLoading, isError, error } = usePokemons(page, 20, searchQuery, minId, maxId, typeFilters, rarityFilter);

    if (isError) {
        return (
            <div className="text-center py-20 text-destructive">
                <p>Ocorreu um erro ao carregar os Pokémons.</p>
                <p className="text-sm opacity-80">{error?.message}</p>
            </div>
        );
    }

    const characters = data?.results || [];
    const maxPages = data ? Math.ceil(data.count / 20) : 0;

    return (
        <div className="w-full flex flex-col space-y-8">
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="aspect-[4/5] rounded-xl" />
                    ))}
                </div>
            ) : characters.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                    Nenhum pokémon encontrado.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {characters.map((pokemon: any) => (
                        <CharacterCard
                            key={pokemon.id}
                            id={pokemon.id}
                            name={pokemon.name}
                            imageUrl={pokemon.imageUrl}
                        />
                    ))}
                </div>
            )}


            {/* Pagination */}
            {!isLoading && maxPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-8">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Página {page} de {maxPages}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setPage(page + 1)}
                        disabled={page >= maxPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
