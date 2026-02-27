import { usePokemonStore } from "./store";

describe("usePokemonStore", () => {
    beforeEach(() => {
        // Reset the store before each test
        usePokemonStore.setState({
            searchQuery: "",
            minId: undefined,
            maxId: undefined,
            typeFilters: [],
            rarityFilter: null,
        });
    });

    it("should initialize with default values", () => {
        const state = usePokemonStore.getState();
        expect(state.searchQuery).toBe("");
        expect(state.minId).toBeUndefined();
        expect(state.maxId).toBeUndefined();
        expect(state.typeFilters).toEqual([]);
        expect(state.rarityFilter).toBeNull();
    });

    it("should update search query", () => {
        usePokemonStore.getState().setSearchQuery("pikachu");
        expect(usePokemonStore.getState().searchQuery).toBe("pikachu");
    });

    it("should update region filters (minId, maxId)", () => {
        usePokemonStore.getState().setRegion(1, 151);
        expect(usePokemonStore.getState().minId).toBe(1);
        expect(usePokemonStore.getState().maxId).toBe(151);
    });

    it("should toggle type filters", () => {
        const state = usePokemonStore.getState();

        // Add fire
        state.setTypeFilter("fire");
        expect(usePokemonStore.getState().typeFilters).toEqual(["fire"]);

        // Add water
        usePokemonStore.getState().setTypeFilter("water");
        expect(usePokemonStore.getState().typeFilters).toEqual(["fire", "water"]);

        // Remove fire
        usePokemonStore.getState().setTypeFilter("fire");
        expect(usePokemonStore.getState().typeFilters).toEqual(["water"]);
    });

    it("should toggle rarity filter", () => {
        const state = usePokemonStore.getState();

        // Set to legendary
        state.setRarityFilter("legendary");
        expect(usePokemonStore.getState().rarityFilter).toBe("legendary");

        // Toggle the same rarity should set it to null
        usePokemonStore.getState().setRarityFilter("legendary");
        expect(usePokemonStore.getState().rarityFilter).toBeNull();

        // Set to mythical
        usePokemonStore.getState().setRarityFilter("mythical");
        expect(usePokemonStore.getState().rarityFilter).toBe("mythical");
    });

    it("should reset all filters", () => {
        const state = usePokemonStore.getState();

        state.setSearchQuery("bulbasaur");
        state.setRegion(1, 151);
        state.setTypeFilter("grass");
        state.setRarityFilter("mythical");

        state.resetFilters();
        const resetState = usePokemonStore.getState();

        expect(resetState.searchQuery).toBe("");
        expect(resetState.minId).toBeUndefined();
        expect(resetState.maxId).toBeUndefined();
        expect(resetState.typeFilters).toEqual([]);
        expect(resetState.rarityFilter).toBeNull();
    });
});
