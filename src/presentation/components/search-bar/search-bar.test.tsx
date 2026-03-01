import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./search-bar";

describe("SearchBar", () => {
  it("renderiza com value e placeholder", () => {
    render(
      <SearchBar value="pikachu" onChange={vi.fn()} placeholder="Buscar..." />
    );
    const input = screen.getByPlaceholderText("Buscar...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("pikachu");
  });

  it("usa placeholder padrão quando não informado", () => {
    render(<SearchBar value="" onChange={vi.fn()} />);
    expect(
      screen.getByPlaceholderText("Buscar Pokémon pelo nome...")
    ).toBeInTheDocument();
  });

  it("chama onChange ao digitar", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);
    const input = screen.getByPlaceholderText("Buscar Pokémon pelo nome...");

    await user.type(input, "char");

    expect(onChange).toHaveBeenCalledWith("c");
    expect(onChange).toHaveBeenCalledWith("h");
    expect(onChange).toHaveBeenCalledWith("a");
    expect(onChange).toHaveBeenCalledWith("r");
  });
});
