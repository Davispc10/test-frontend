import React from "react";
import { render, RenderResult, waitFor, screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";

import { LoadCharactersComics, LoadCharactersComicsResult } from "@/domain/features";
import { CharacterDetails } from "@/presentation/views";
import { comicMock } from "@/tests/domain/mocks";
import { RequestHandler, RequestHandleResult } from "@/data/contracts";

class LoadCharactersComicsSpy implements LoadCharactersComics {
  callsCount = 0;
  comics = [comicMock()];

  async loadAll(id: number): Promise<LoadCharactersComicsResult> {
    this.callsCount++;
    return Promise.resolve({
      comics: this.comics,
      totalComics: 50,
    });
  }
}

class RequestHandlerSpy implements RequestHandler<any> {
  callsCount = 0;
  handle(queryKey: string | string[], callback: () => Promise<any>, options?: Record<any, unknown>): RequestHandleResult<any> {
    this.callsCount++;
    callback();
    return {
      isLoading: false,
      data: "any_data",
      error: null,
    }
  }
}

type SutTypes = {
  sut: RenderResult;
  loadCharactersComicsSpy: LoadCharactersComicsSpy;
  requestHandlerSpy: RequestHandlerSpy;
  history: MemoryHistory;
};

const makeSut = (loadCharactersComicsSpy = new LoadCharactersComicsSpy(), requestHandlerSpy = new RequestHandlerSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ["/characters/details/1"] });
  const sut = render(
    <Router navigator={history} location={history.location}>
      <CharacterDetails loadCharactersComics={loadCharactersComicsSpy} requestHandler={requestHandlerSpy} />
    </Router>
  );
  return {
    sut,
    loadCharactersComicsSpy,
    requestHandlerSpy,
    history,
  };
};

describe("CharacterDetails View", () => {
  test("Should call loadCharactersComics on start", async () => {
    const { loadCharactersComicsSpy } = makeSut();
    expect(loadCharactersComicsSpy.callsCount).toBe(1);
  });

  test("Should render a characters on success", async () => {
    const { loadCharactersComicsSpy } = makeSut();

    await waitFor(() => {
      const characterCardList = screen.getAllByTestId("comic-card");
      expect(characterCardList).toHaveLength(loadCharactersComicsSpy.comics.length);
    });
  });

  test("Should call on change page of pagination", async () => {
    const { loadCharactersComicsSpy } = makeSut();

    await waitFor(() => {
      const paginationNextButton = screen.getByTestId("pagination-next-button");
      fireEvent.click(paginationNextButton);
      const paginationPrevButton = screen.getByTestId("pagination-prev-button");
      fireEvent.click(paginationPrevButton);
    });

    expect(loadCharactersComicsSpy.callsCount).toBeGreaterThanOrEqual(3);
  });

  test("Should return to homepage on click in back button", async () => {
    const { history } = makeSut();

    await waitFor(() => {
      const backButton = screen.getByTestId("back-button");
      fireEvent.click(backButton);
    });

    expect(history.location.pathname).toBe("/");
  });

  test("Should show error if loadCharacters fails", async () => {
    const requestHandlerSpy = new RequestHandlerSpy();
    const loadCharactersComicsSpy = new LoadCharactersComicsSpy();
    jest.spyOn(requestHandlerSpy, "handle").mockReturnValueOnce({ isLoading: false, data: "any_data", error: "requestHandler error"});
    jest.spyOn(loadCharactersComicsSpy, "loadAll").mockRejectedValueOnce(new Error("loadCharactersComics error"));

    makeSut(loadCharactersComicsSpy, requestHandlerSpy);

    await waitFor(() => {
      expect(screen.queryByTestId("load-error")).toBeInTheDocument();
    });
  });

  test("Should present loading component on request", async () => {
    const loadCharactersComicsSpy = new LoadCharactersComicsSpy();
    const requestHandlerSpy = new RequestHandlerSpy();
    jest.spyOn(requestHandlerSpy, "handle").mockReturnValueOnce({
      isLoading: true,
      data: null,
      error: null,
    });

    makeSut(loadCharactersComicsSpy, requestHandlerSpy);

    await waitFor(() => {
      const loading = screen.getByTestId("loading");
      expect(loading).toBeInTheDocument();
    });
  });
});
