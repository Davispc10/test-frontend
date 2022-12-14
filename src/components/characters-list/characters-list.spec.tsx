import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  CharactersListProps,
  CharactersList,
} from "./characters-list.component";
import { mockCharactersList } from "@mocks/characters-list.mock";
import { useCharacters } from "@hooks/use-characters";

jest.mock("@hooks/use-characters", () => {
  return {
    useCharacters: jest.fn(),
  };
});

beforeAll(() => {
  jest.clearAllMocks();

  (useCharacters as jest.Mock).mockImplementation(() => ({
    characters: mockCharactersList(),
    isLoading: false,
    isError: false,
    error: null,
  }));
});

describe("CharactersList", () => {
  it("Should render", () => {
    const mockProps: CharactersListProps = {};

    render(<CharactersList {...mockProps} />);

    // Checa se o hook só foi chamado uma única vez
    expect(useCharacters).toHaveBeenCalledTimes(1);
  });
});
