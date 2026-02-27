import { create } from "zustand";

export type Rarity = "legendary" | "mythical" | "ultrabeast" | null;

interface PokemonStore {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    minId: number | undefined;
    maxId: number | undefined;
    setRegion: (min: number | undefined, max: number | undefined) => void;
    typeFilters: string[];
    setTypeFilter: (type: string) => void;
    rarityFilter: Rarity;
    setRarityFilter: (rarity: Rarity) => void;
    page: number;
    setPage: (page: number) => void;
    resetFilters: () => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query, page: 1 }),
    minId: undefined,
    maxId: undefined,
    setRegion: (min, max) => set({ minId: min, maxId: max, page: 1 }),
    typeFilters: [],
    setTypeFilter: (type) => set((state) => ({
        page: 1,
        typeFilters: state.typeFilters.includes(type)
            ? state.typeFilters.filter(t => t !== type)
            : [...state.typeFilters, type]
    })),
    rarityFilter: null,
    setRarityFilter: (rarity) => set((state) => ({
        page: 1,
        rarityFilter: state.rarityFilter === rarity ? null : rarity
    })),
    page: 1,
    setPage: (page) => set({ page }),
    resetFilters: () => set({
        minId: undefined,
        maxId: undefined,
        typeFilters: [],
        rarityFilter: null,
        searchQuery: "",
        page: 1
    }),
}));
