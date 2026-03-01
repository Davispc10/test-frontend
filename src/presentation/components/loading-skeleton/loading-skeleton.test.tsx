import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingSkeleton } from "./loading-skeleton";

describe("LoadingSkeleton", () => {
  it("renderiza 20 skeletons por padrão", () => {
    const { container } = render(<LoadingSkeleton />);
    const cards = container.querySelectorAll(".rounded-2xl");
    expect(cards.length).toBe(20);
  });

  it("renderiza count skeletons quando informado", () => {
    const { container } = render(<LoadingSkeleton count={6} />);
    const cards = container.querySelectorAll(".rounded-2xl");
    expect(cards.length).toBe(6);
  });

  it("renderiza em grid", () => {
    const { container } = render(<LoadingSkeleton count={4} />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("grid-cols-2");
  });
});
