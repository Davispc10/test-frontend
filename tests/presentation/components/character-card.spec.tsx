import React from "react";
import { render, screen } from "@testing-library/react";

import { CharacterCard } from "@/presentation/components";
import { characterMock } from "@/tests/domain/mocks";

type CharacterCardProps = {
  name: string;
  description: string;
  thumbnail: string;
};

const makeSut = (props: CharacterCardProps) => {
  const sut = render(<CharacterCard {...props} />);
  return sut;
};

describe("Pagination Component", () => {
  test("Should inits with correct values", () => {
    makeSut(characterMock());

    expect(screen.getByTestId("character-thumbnail").style.backgroundImage).toBe(`url(${characterMock().thumbnail})`);
    expect(screen.getByTestId("character-name")).toHaveTextContent(characterMock().name);
    expect(screen.getByTestId("character-description")).toHaveTextContent(characterMock().description);
  });
});
