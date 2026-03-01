import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PokemonCard } from "./pokemon-card";
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
    { name: "defense", value: 65 },
  ],
};

describe("PokemonCard", () => {
  it("renderiza nome capitalizado", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
  });

  it("renderiza id formatado como #001", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText("#001")).toBeInTheDocument();
  });

  it("renderiza badges de tipo", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText("grass")).toBeInTheDocument();
    expect(screen.getByText("poison")).toBeInTheDocument();
  });

  it("renderiza link para página de detalhes", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/pokemon/1");
  });

  it("renderiza imagem com alt correto", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    const img = screen.getByRole("img", { name: "Bulbasaur" });
    expect(img).toHaveAttribute("src", "https://example.com/bulbasaur.png");
  });
});
