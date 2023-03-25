import React from "react";

import { render, screen } from "@testing-library/react";
import CharacterInformation from "@/components/comics/CharacterInformation";

import { intersectionObserverMock } from "@/__mocks__/intersectionObserver.mock";
import { resizeObserver } from "@/__mocks__/resizeObserver.mock";

import { ComicMock } from "@/__mocks__/comic.mock";
import { HeroMock } from "@/__mocks__/hero.mock";

const comicListMock = Array.from({ length: 10 }, () => new ComicMock());
const heroMock = new HeroMock();

window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);

window.ResizeObserver = jest.fn().mockImplementation(resizeObserver);

describe("HeroList component", () => {
  it("should render the hero list", () => {
    render(<CharacterInformation hero={heroMock} comics={comicListMock} />);

    const heroName = screen.getByText(heroMock.name);
    expect(heroName).toBeInTheDocument();

    const heroDescription = screen.getByText(heroMock.description);
    expect(heroDescription).toBeInTheDocument();

    const comicNames = comicListMock.map((comic) => comic.title);
    comicNames.forEach((name) => {
      const comicElement = screen.getByAltText(name);
      expect(comicElement).toBeInTheDocument();
    });
  });
});
