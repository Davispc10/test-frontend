import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PaginationControls } from "./pagination-controls";

describe("PaginationControls", () => {
  it("retorna null quando totalPages <= 1", () => {
    const { container } = render(
      <PaginationControls
        currentPage={1}
        totalCount={10}
        limit={20}
        onPageChange={vi.fn()}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renderiza botões Anterior e Próximo quando há múltiplas páginas", () => {
    render(
      <PaginationControls
        currentPage={2}
        totalCount={100}
        limit={20}
        onPageChange={vi.fn()}
      />
    );
    expect(screen.getByRole("button", { name: /anterior/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /próximo/i })).toBeInTheDocument();
    expect(screen.getByText("2 / 5")).toBeInTheDocument();
  });

  it("desabilita Anterior na primeira página", () => {
    render(
      <PaginationControls
        currentPage={1}
        totalCount={100}
        limit={20}
        onPageChange={vi.fn()}
      />
    );
    expect(screen.getByRole("button", { name: /anterior/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /próximo/i })).not.toBeDisabled();
  });

  it("desabilita Próximo na última página", () => {
    render(
      <PaginationControls
        currentPage={5}
        totalCount={100}
        limit={20}
        onPageChange={vi.fn()}
      />
    );
    expect(screen.getByRole("button", { name: /anterior/i })).not.toBeDisabled();
    expect(screen.getByRole("button", { name: /próximo/i })).toBeDisabled();
  });

  it("chama onPageChange ao clicar em Próximo", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <PaginationControls
        currentPage={2}
        totalCount={100}
        limit={20}
        onPageChange={onPageChange}
      />
    );
    await user.click(screen.getByRole("button", { name: /próximo/i }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("chama onPageChange ao clicar em Anterior", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <PaginationControls
        currentPage={3}
        totalCount={100}
        limit={20}
        onPageChange={onPageChange}
      />
    );
    await user.click(screen.getByRole("button", { name: /anterior/i }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
