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
    resetFilters: () => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
    minId: undefined,
    maxId: undefined,
    setRegion: (min, max) => set({ minId: min, maxId: max }),
    typeFilters: [],
    setTypeFilter: (type) => set((state) => ({
        typeFilters: state.typeFilters.includes(type)
            ? state.typeFilters.filter(t => t !== type)
            : [...state.typeFilters, type]
    })),
    rarityFilter: null,
    setRarityFilter: (rarity) => set((state) => ({
        rarityFilter: state.rarityFilter === rarity ? null : rarity
    })),
    resetFilters: () => set({
        minId: undefined,
        maxId: undefined,
        typeFilters: [],
        rarityFilter: null,
        searchQuery: ""
    }),
}));
