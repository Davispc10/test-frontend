import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PokemonList } from "./pokemon-list";
import type { IPokemonListItem } from "@/domain/entities/pokemon";

vi.mock("next/link", () => {
  const React = require("react");
  return {
    default: ({
      children,
      href,
    }: {
      children: React.ReactNode;
      href: string;
    }) => React.createElement("a", { href }, children),
  };
});

vi.mock("next/image", () => {
  const React = require("react");
  return {
    default: ({ src, alt }: { src: string; alt: string }) =>
      React.createElement("img", { src, alt }),
  };
});

const mockPokemon: IPokemonListItem = {
  id: 1,
  name: "bulbasaur",
  imageUrl: "https://example.com/bulbasaur.png",
  types: ["grass", "poison"],
  baseExperience: 64,
  stats: [
    { name: "attack", value: 49 },
    { name: "defense", value: 49 },
  ],
};

describe("PokemonList", () => {
  it("renderiza vazio quando items é array vazio", () => {
    const { container } = render(<PokemonList items={[]} />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(screen.queryByText("Bulbasaur")).not.toBeInTheDocument();
  });

  it("renderiza um card por item", () => {
    render(
      <PokemonList
        items={[
          mockPokemon,
          { ...mockPokemon, id: 2, name: "ivysaur" },
        ]}
      />
    );
    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("Ivysaur")).toBeInTheDocument();
  });

  it("renderiza em grid responsivo", () => {
    const { container } = render(<PokemonList items={[mockPokemon]} />);
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-2", "sm:grid-cols-3", "md:grid-cols-4");
  });
});
