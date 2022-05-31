import { render, screen } from "@testing-library/react";

import { Character } from ".";

describe("[Component] Character", () => {
  it("should render correctly", () => {
    render(
      <Character
        character={{
          id: 1,
          name: "Test",
          thumbnail: {
            path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
            extension: "jpg",
          },
        }}
      />
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/character/1");
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByAltText("Test")).toBeInTheDocument();
    expect(screen.getByAltText("Test")).toHaveAttribute(
      "src",
      "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg"
    );
  });
});
