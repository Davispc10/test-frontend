import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";

//import Home, { getStaticProps } from "@/pages/";
import Home, { getStaticProps } from "../src/pages";
import { api } from "@/services/api";

let axiosMock: MockAdapter;

describe("Home page", () => {
  beforeEach(() => {
    axiosMock = new MockAdapter(api);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it("should render the home page correctly", () => {
    render(
      <Home
        baseCharacters={[
          {
            id: 1,
            name: "Thor",
            thumbnail: {
              path: "http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350",
              extension: "jpg",
            },
          },
          {
            id: 2,
            name: "Thanos",
            thumbnail: {
              path: "http://i.annihil.us/u/prod/marvel/i/mg/6/40/5274137e3e2cd",
              extension: "jpg",
            },
          },
        ]}
        total={80}
      />
    );

    expect(screen.getByText("CHARACTERS")).toBeInTheDocument();
    expect(screen.getByText("Thor")).toBeInTheDocument();
    expect(screen.getByText("Thanos")).toBeInTheDocument();
    expect(screen.getByText("Carregar mais...")).toBeInTheDocument();
  });

  it("should be able to seach character", async () => {
    axiosMock.onGet("/characters").reply(200, {
      status: 200,
      data: {
        results: [
          {
            id: 3,
            name: "Iron Man",
            thumbnail: {
              path: "http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350",
              extension: "jpg",
            },
          },
        ],
        total: 1,
      },
    });
    render(
      <Home
        baseCharacters={[
          {
            id: 1,
            name: "Thor",
            thumbnail: {
              path: "http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350",
              extension: "jpg",
            },
          },
          {
            id: 2,
            name: "Thanos",
            thumbnail: {
              path: "http://i.annihil.us/u/prod/marvel/i/mg/6/40/5274137e3e2cd",
              extension: "jpg",
            },
          },
        ]}
        total={80}
      />
    );

    await userEvent.type(
      screen.getByPlaceholderText("Digite qual personagem deseja procurar"),
      "Iron"
    );

    expect(screen.getByText("CHARACTERS")).toBeInTheDocument();
    await waitFor(() => {
      expect(axiosMock.history.get.length).toBe(1);
    });
    expect(screen.getByText("Iron Man")).toBeInTheDocument();
    expect(screen.queryByText("Carregar mais...")).not.toBeInTheDocument();
  });

  it("should be able to load more characters", async () => {
    axiosMock.onGet("/characters").reply(200, {
      status: 200,
      data: {
        results: [
          {
            id: 3,
            name: "Iron Man",
            thumbnail: {
              path: "http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350",
              extension: "jpg",
            },
          },
        ],
        total: 1,
      },
    });
    render(
      <Home
        baseCharacters={[
          {
            id: 1,
            name: "Thor",
            thumbnail: {
              path: "http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350",
              extension: "jpg",
            },
          },
          {
            id: 2,
            name: "Thanos",
            thumbnail: {
              path: "http://i.annihil.us/u/prod/marvel/i/mg/6/40/5274137e3e2cd",
              extension: "jpg",
            },
          },
        ]}
        total={80}
      />
    );

    await userEvent.click(screen.getByText("Carregar mais..."));

    expect(screen.getByText("CHARACTERS")).toBeInTheDocument();
    await waitFor(() => {
      expect(axiosMock.history.get.length).toBe(1);
    });
    expect(screen.getByText("Thor")).toBeInTheDocument();
    expect(screen.getByText("Thanos")).toBeInTheDocument();
    expect(screen.getByText("Iron Man")).toBeInTheDocument();
    expect(screen.getByText("Carregar mais...")).toBeInTheDocument();
  });

  it("should load initial data", async () => {
    axiosMock.onGet("/characters").reply(200, {
      status: 200,
      data: {
        results: [
          {
            id: 3,
            name: "Iron Man",
            thumbnail: {
              path: "http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350",
              extension: "jpg",
            },
          },
        ],
        total: 1,
      },
    });

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          baseCharacters: [
            {
              id: 3,
              name: "Iron Man",
              thumbnail: {
                path: "http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350",
                extension: "jpg",
              },
            },
          ],
          total: 1,
        },
      })
    );
  });
});
