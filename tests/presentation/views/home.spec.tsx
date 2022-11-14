import React from "react";
import { fireEvent, render, RenderResult, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";

import { Home } from "@/presentation/views";
import { LoadCharacters } from "@/domain/features";
import { Character } from "@/domain/models";
import { characterMock } from "@/tests/domain/mocks";
import { ReactQueryClientProvider, RequestHandlerReactQueryAdapter } from "@/infra/externals";
import { RequestHandler, RequestHandleResult } from "@/data/contracts";

class LoadCharactersSpy implements LoadCharacters {
  callsCount = 0;
  characters = [characterMock()];

  async loadAll(page: number, limit: number): Promise<Character[]> {
    this.callsCount++;
    return Promise.resolve(this.characters);
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
  loadCharactersSpy: LoadCharactersSpy;
  requestHandlerSpy: RequestHandlerSpy;
  history: MemoryHistory;
};

const makeSut = (loadCharactersSpy = new LoadCharactersSpy(), requestHandlerSpy = new RequestHandlerSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  const sut = render(
    <ReactQueryClientProvider>
      <Router navigator={history} location={history.location}>
        <Home loadCharacters={loadCharactersSpy} requestHandler={requestHandlerSpy} />
      </Router>
    </ReactQueryClientProvider>
  );
  return {
    sut,
    loadCharactersSpy,
    requestHandlerSpy,
    history,
  };
};

describe("Home View", () => {
  test("Should call loadCharacters on start", async () => {
    const { loadCharactersSpy, requestHandlerSpy } = makeSut();
    expect(requestHandlerSpy.callsCount).toBe(1);
    expect(loadCharactersSpy.callsCount).toBe(1);
  });

  test("Should render a characters on success", async () => {
    const { loadCharactersSpy } = makeSut();

    await waitFor(() => {
      const characterCardList = screen.getAllByTestId("character-card");
      expect(characterCardList).toHaveLength(loadCharactersSpy.characters.length);
    });
  });

  test("Should call on change page of pagination", async () => {
    const { loadCharactersSpy } = makeSut();

    await waitFor(() => {
      const paginationNextButton = screen.getByTestId("pagination-next-button");
      fireEvent.click(paginationNextButton);
      const paginationPrevButton = screen.getByTestId("pagination-prev-button");
      fireEvent.click(paginationPrevButton);
    });
    
    expect(loadCharactersSpy.callsCount).toBeGreaterThanOrEqual(3);
  });

  test("Should show error if loadCharacters fails", async () => {
    const requestHandlerSpy = new RequestHandlerSpy();
    const loadCharactersSpy = new LoadCharactersSpy();
    jest.spyOn(requestHandlerSpy, "handle").mockReturnValueOnce({ isLoading: false, data: "any_data", error: "requestHandler error"});
    jest.spyOn(loadCharactersSpy, "loadAll").mockRejectedValueOnce(new Error("loadCharacters error"));

    makeSut(loadCharactersSpy, requestHandlerSpy);

    await waitFor(() => {
      expect(screen.queryByTestId("load-error")).toBeInTheDocument();
    });
  });

  test("Should navigate to character/details on click", async () => {
    const { history } = makeSut();

    await waitFor(() => {
      const link = screen.getByTestId("link");
      fireEvent.click(link);
      expect(history.location.pathname).toBe("/characters/details/1");
    });
  });
});
