import { useQuery } from "@tanstack/react-query";
import { PokemonDetail, PokemonListResponse } from "@/lib/pokemon-api";

export function usePokemons(
    page: number,
    limit: number = 20,
    searchQuery: string = "",
    minId?: number,
    maxId?: number,
    typeFilters: string[] = [],
    rarityFilter?: "legendary" | "mythical" | "ultrabeast" | null
) {
    return useQuery<PokemonListResponse, Error>({
        queryKey: ["pokemons", page, limit, searchQuery, minId, maxId, typeFilters, rarityFilter],
        queryFn: async () => {
            const offset = (page - 1) * limit;
            let url = `/api/pokemons?limit=${limit}&offset=${offset}`;
            if (searchQuery) {
                url += `&search=${encodeURIComponent(searchQuery)}`;
            }
            if (minId !== undefined) {
                url += `&minId=${minId}`;
            }
            if (maxId !== undefined) {
                url += `&maxId=${maxId}`;
            }
            if (typeFilters.length > 0) {
                url += `&types=${encodeURIComponent(typeFilters.join(","))}`;
            }
            if (rarityFilter) {
                url += `&rarity=${rarityFilter}`;
            }

            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Failed to fetch pokemons");
            }
            return res.json();
        },
        staleTime: 30000,
    });
}

export function usePokemon(id: string | number) {
    return useQuery<PokemonDetail, Error>({
        queryKey: ["pokemon", id],
        queryFn: async () => {
            const res = await fetch(`/api/pokemons/${id}`);
            if (!res.ok) {
                throw new Error("Failed to fetch pokemon details");
            }
            return res.json();
        },
        staleTime: 30000,
    });
}
