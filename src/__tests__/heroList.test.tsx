import React from "react";

import { render, screen } from "@testing-library/react";
import HeroList from "@/components/hero/HeroList";

import { intersectionObserverMock } from "@/__mocks__/intersectionObserver.mock";
import { HeroMock } from "@/__mocks__/hero.mock";

export const heroListMock = Array.from({ length: 10 }, () => new HeroMock());

window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);

describe("HeroList component", () => {
  it("should render the hero list", () => {
    render(<HeroList heroes={heroListMock} />);

    const heroNames = heroListMock.map((hero) => hero.name);
    heroNames.forEach((name) => {
      const heroElement = screen.getByText(name);
      expect(heroElement).toBeInTheDocument();
    });
  });
});
