import React from "react";

import { render } from "@testing-library/react";
import { CharacterCard, CharacterCardProps } from "./character-card.component";

describe("CharacterCard", () => {
  it("Should render", () => {
    const mockProps: CharacterCardProps = {
      id: 1,
      name: "Super Hero",
      thumbnail:
        "https://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg",
    };

    const rendered = render(<CharacterCard {...mockProps} />);

    // Checa se existe o texto + Informações no componente
    expect(rendered.getByText("+ Informações")).toBeTruthy();

    // Checa se existe o título "Super Hero" no componente
    expect(rendered.getByText("Super Hero")).toBeTruthy();
  });
});
