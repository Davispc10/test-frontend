import React from "react";

import { Character } from "@/entities/Character";

import CharacterCard, { Props as CharacterCardProps } from "./CharacterCard";

import { render } from "@testing-library/react";

describe("CharacterCard", () => {
  it("should render", () => {
    const props: CharacterCardProps = {
      character: new Character({
        name: "character-name",
      } as any),
    };

    const rendered = render(<CharacterCard {...props} />);

    expect(rendered.getByText(props.character.name)).toBeTruthy();
  });
});
