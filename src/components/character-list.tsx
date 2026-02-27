"use client";

import { usePokemonStore } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { usePokemons } from "@/hooks/usePokemonQuery";
import { CharacterCard } from "./character-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState, useEffect } from "react";

export function CharacterList() {
    const { searchQuery, minId, maxId, typeFilters, rarityFilter, page, setPage } = usePokemonStore(
        useShallow((state) => ({
            searchQuery: state.searchQuery,
            minId: state.minId,
            maxId: state.maxId,
            typeFilters: state.typeFilters,
            rarityFilter: state.rarityFilter,
            page: state.page,
            setPage: state.setPage,
        }))
    );
    const [pageInput, setPageInput] = useState(page.toString());
    const { data, isLoading, isError, error } = usePokemons(page, 20, searchQuery, minId, maxId, typeFilters, rarityFilter);

    const characters = data?.results || [];
    const maxPages = data ? Math.ceil(data.count / 20) : 0;

    // Sync input when page changes (e.g. from Prev/Next buttons)
    useEffect(() => {
        setPageInput(page.toString());
    }, [page]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Impedir navegação se o usuário estiver digitando em um campo de input ou textarea
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                return;
            }

            if (e.key === 'ArrowLeft' && page > 1) {
                setPage(page - 1);
            } else if (e.key === 'ArrowRight' && maxPages > 0 && page < maxPages) {
                setPage(page + 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [page, maxPages, setPage]);

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
                            types={pokemon.types}
                        />
                    ))}
                </div>
            )}


            {/* Pagination */}
            {!isLoading && maxPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="w-9 h-9 border-white/10 hover:bg-white/10"
                            onClick={() => setPage(1)}
                            disabled={page === 1}
                            title="Primeira página"
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="w-9 h-9 border-white/10 hover:bg-white/10"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            title="Página anterior"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-white/40 uppercase tracking-widest whitespace-nowrap">
                            Página
                        </span>
                        <div className="relative group">
                            <input
                                type="number"
                                min={1}
                                max={maxPages}
                                value={pageInput}
                                onChange={(e) => setPageInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const newPage = parseInt(pageInput);
                                        if (!isNaN(newPage) && newPage >= 1 && newPage <= maxPages) {
                                            setPage(newPage);
                                        } else {
                                            setPageInput(page.toString());
                                        }
                                    }
                                }}
                                onBlur={() => {
                                    const newPage = parseInt(pageInput);
                                    if (!isNaN(newPage) && newPage >= 1 && newPage <= maxPages) {
                                        setPage(newPage);
                                    } else {
                                        setPageInput(page.toString());
                                    }
                                }}
                                className="w-16 h-10 bg-black/40 border border-white/10 rounded-xl text-center text-white font-black text-lg focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <div className="absolute inset-0 rounded-xl bg-red-500/0 group-hover:bg-red-500/5 pointer-events-none transition-colors" />
                        </div>
                        <span className="text-sm font-medium text-white/40 uppercase tracking-widest whitespace-nowrap">
                            de {maxPages}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="w-9 h-9 border-white/10 hover:bg-white/10"
                            onClick={() => setPage(page + 1)}
                            disabled={page >= maxPages}
                            title="Próxima página"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="w-9 h-9 border-white/10 hover:bg-white/10"
                            onClick={() => setPage(maxPages)}
                            disabled={page >= maxPages}
                            title="Última página"
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
