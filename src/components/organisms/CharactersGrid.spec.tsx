import React from "react";

import { Character } from "@/entities/Character";

import CharactersGrid, { Props as CharactersGridProps } from "./CharactersGrid";

import { render } from "@testing-library/react";

describe("CharactersGrid", () => {
  it("should render", () => {
    const props: CharactersGridProps = {
      characters: [
        new Character({
          name: "character-name",
        } as any),
      ],
    };

    const rendered = render(<CharactersGrid {...props} />);
    
    props.characters.forEach((character) => {
      expect(rendered.getByText(character.name)).toBeTruthy();
    })
  });
});
