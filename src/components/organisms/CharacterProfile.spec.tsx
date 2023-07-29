import React from "react";

import { Character } from "@/entities/Character";

import CharacterProfile, {
  Props as CharacterProfileProps,
} from "./CharacterProfile";

import { render } from "@testing-library/react";

describe("CharacterProfile", () => {
  it("should render with no references", () => {
    const props: CharacterProfileProps = {
      character: new Character({
        comics: {
          available: 0,
        },
        name: "character-name",
        events: {
          available: 0,
        },
        series: {
          available: 0,
        },
        stories: {
          available: 0,
        },
        urls: [],
      } as any),
      comics: [],
      events: [],
      series: [],
      stories: [],
    };

    const rendered = render(<CharacterProfile {...props} />);

    expect(rendered.getByText(props.character.name)).toBeTruthy();
  });
});
