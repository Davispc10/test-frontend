import { render, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import Character, {
  getStaticProps,
  getStaticPaths,
} from "../src/pages/character/[id]";
import { api } from "@/services/api";

let axiosMock: MockAdapter;

describe("Home page", () => {
  beforeEach(() => {
    axiosMock = new MockAdapter(api);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it("should render the home page correctly", async () => {
    axiosMock.onGet("characters/1/comics").reply(200, {
      status: 200,
      data: {
        results: [
          {
            id: 6,
            title: "Comic Title",
            description: "Comic Description",
            thumbnail: {
              path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
              extension: "jpg",
            },
            urls: [
              {
                type: "detail",
                url: "http://marvel.com/comics/comics/6/comic_title?utm_campaign=apiRef&utm_source=a0e6c9c8d8e0f4c6b0c5f9c8d8e0f4c6b0c5f9c&utm_medium=api",
              },
            ],
          },
        ],
      },
    });

    render(
      <Character
        character={{
          id: 1,
          name: "Thor",
          thumbnail: {
            path: "http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350",
            extension: "jpg",
          },
          description:
            "Thor is a fictional superhero appearing in American comic books published by Marvel Comics. The character was created by writer-editor Stan Lee and artist Jack Kirby, and first appeared in The Incredible Hulk #239 (May, 2004).",
          comics: {
            available: 2,
            collectionURI:
              "http://gateway.marvel.com/v1/public/characters/1011334/comics",
            returned: 2,
            items: [],
          },
          events: {
            available: 2,
            returned: 2,
            items: [],
          },
          series: {
            available: 2,
            returned: 2,
            items: [],
          },
          stories: {
            available: 2,
            returned: 2,
            items: [],
          },
          urls: [],
        }}
      />
    );

    expect(screen.getByText("Thor")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Thor is a fictional superhero appearing in American comic books published by Marvel Comics. The character was created by writer-editor Stan Lee and artist Jack Kirby, and first appeared in The Incredible Hulk #239 (May, 2004)."
      )
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(axiosMock.history.get.length).toBe(1);
    });
    expect(screen.getByText("Comic Title")).toBeInTheDocument();
  });

  it("should load initial params", async () => {
    const data = [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ];
    axiosMock.onGet("/characters").reply(200, {
      status: 200,
      data: {
        results: data,
      },
    });

    const response = await getStaticPaths({});

    expect(response).toEqual(
      expect.objectContaining({
        paths: [
          {
            params: {
              id: "1",
            },
          },
          {
            params: {
              id: "2",
            },
          },
          {
            params: {
              id: "3",
            },
          },
        ],
      })
    );
  });

  it("should load initial data", async () => {
    const data = {
      id: 1,
      name: "Thor",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350",
        extension: "jpg",
      },
      description:
        "Thor is a fictional superhero appearing in American comic books published by Marvel Comics. The character was created by writer-editor Stan Lee and artist Jack Kirby, and first appeared in The Incredible Hulk #239 (May, 2004).",
      comics: {
        available: 2,
        collectionURI:
          "http://gateway.marvel.com/v1/public/characters/1011334/comics",
        returned: 2,
        items: [],
      },
      events: {
        available: 2,
        returned: 2,
        items: [],
      },
      series: {
        available: 2,
        returned: 2,
        items: [],
      },
      stories: {
        available: 2,
        returned: 2,
        items: [],
      },
      urls: [],
    };
    axiosMock.onGet("/characters/1").reply(200, {
      status: 200,
      data: {
        results: [data],
      },
    });

    const response = await getStaticProps({
      params: {
        id: "1",
      },
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          character: data,
        },
      })
    );
  });
});
