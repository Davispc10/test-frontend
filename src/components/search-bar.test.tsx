import { render, screen, fireEvent, act } from "@testing-library/react";
import { SearchBar } from "./search-bar";
import { usePokemonStore } from "@/lib/store";

// Mock do router do next/navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
    }),
    usePathname: () => '/',
}));

describe("SearchBar Component", () => {
    beforeEach(() => {
        // Objeto global simulando o temporizador do jest
        jest.useFakeTimers();

        // Reset Zustand Store
        usePokemonStore.setState({
            searchQuery: "",
            minId: undefined,
            maxId: undefined,
            typeFilters: [],
            rarityFilter: null,
        });
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("should render empty input correctly", () => {
        render(<SearchBar />);
        const input = screen.getByPlaceholderText("BUSCAR POKÉMON...");
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue("");
    });

    it("should allow typing and update local value immediately", () => {
        render(<SearchBar />);
        const input = screen.getByPlaceholderText("BUSCAR POKÉMON...");

        fireEvent.change(input, { target: { value: "pikachu" } });

        expect(input).toHaveValue("pikachu");
    });

    it("should update global store after debounce delay", () => {
        render(<SearchBar />);
        const input = screen.getByPlaceholderText("BUSCAR POKÉMON...");

        fireEvent.change(input, { target: { value: "charizard" } });

        // Before delay, store should be empty
        expect(usePokemonStore.getState().searchQuery).toBe("");

        // Fast forward 500ms (debounce delay)
        act(() => {
            jest.advanceTimersByTime(500);
        });

        // After delay, store should be updated
        expect(usePokemonStore.getState().searchQuery).toBe("charizard");
    });

    it("should show clear button when input has text, and clear when clicked", () => {
        render(<SearchBar />);
        const input = screen.getByPlaceholderText("BUSCAR POKÉMON...");

        // Type something
        fireEvent.change(input, { target: { value: "mewtwo" } });

        // Button should appear
        const clearButton = screen.getByRole("button");
        expect(clearButton).toBeInTheDocument();

        // Click Clear Button
        fireEvent.click(clearButton);

        // Input should be empty
        expect(input).toHaveValue("");

        // Store should be immediately cleared
        expect(usePokemonStore.getState().searchQuery).toBe("");

        // Ensure clear button disappeared
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
});
