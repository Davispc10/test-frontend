import { render, screen, fireEvent, act } from "@testing-library/react";
import { RegionBanners } from "./region-banners";

describe("RegionBanners Component", () => {
    it("should render all regions", () => {
        const mockOnSelectRegion = jest.fn();
        render(<RegionBanners onSelectRegion={mockOnSelectRegion} activeRegion={undefined} />);

        // Verify some regions appear
        expect(screen.getByText("Kanto")).toBeInTheDocument();
        expect(screen.getByText("Johto")).toBeInTheDocument();
        expect(screen.getByText("Hoenn")).toBeInTheDocument();
        expect(screen.getByText("Paldea")).toBeInTheDocument();
    });

    it("should call onSelectRegion with correct min and max IDs when a region is clicked", () => {
        const mockOnSelectRegion = jest.fn();
        render(<RegionBanners onSelectRegion={mockOnSelectRegion} activeRegion={undefined} />);

        // Click on Kanto
        const kantoBanner = screen.getByText("Kanto").closest("button");
        fireEvent.click(kantoBanner!);

        // Kanto is gen 1 (1 to 151)
        expect(mockOnSelectRegion).toHaveBeenCalledWith(1, 151);
    });

    it("should pass undefined when an already active region is clicked (toggle off)", () => {
        const mockOnSelectRegion = jest.fn();
        // Render with Kanto already active
        render(<RegionBanners onSelectRegion={mockOnSelectRegion} activeRegion="kanto" />);

        // O botão para limpar aparece
        expect(screen.getByText("CLIQUE PARA LIMPAR")).toBeInTheDocument();

        // Click on Kanto again
        const kantoBanner = screen.getByText("Kanto").closest("button");
        fireEvent.click(kantoBanner!);

        // Should toggle off (pass undefined, undefined)
        expect(mockOnSelectRegion).toHaveBeenCalledWith(undefined, undefined);
    });

    it("should not trigger select if just dragging", () => {
        const mockOnSelectRegion = jest.fn();
        render(<RegionBanners onSelectRegion={mockOnSelectRegion} activeRegion={undefined} />);

        const scrollContainer = screen.getByRole("button", { name: /Kanto/i }).closest("div.overflow-x-auto");
        const kantoBanner = screen.getByRole("button", { name: /Kanto/i });

        // Simulate Dragging
        act(() => {
            fireEvent.mouseDown(scrollContainer!, { clientX: 200, pageX: 200 });
        });

        act(() => {
            fireEvent.mouseMove(scrollContainer!, { clientX: 100, pageX: 100 }); // Moved 100px so distance > 10
        });

        act(() => {
            fireEvent.mouseUp(scrollContainer!);
        });

        // Simulate click
        act(() => {
            fireEvent.click(kantoBanner);
        });

        // Expect it to NOT have been called because distance was > 10
        expect(mockOnSelectRegion).not.toHaveBeenCalled();
    });
});
