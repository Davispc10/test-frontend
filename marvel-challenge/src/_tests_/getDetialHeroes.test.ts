import {
  getDetailHero,
  getComics,
} from "@/services/hooks/getDetailHero/useDetailHero";
import { api } from "@/services/api";

jest.mock("@/services/api");

describe("getDetailHero function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const publicKey = "d724d0ec5f7dfbf8641faecb901e8229";
  const time = 1234567890;
  const hash = "hash1234567890";
  it("should fetch hero details from the API and return formatted data", async () => {
    const apiResponse = {
      data: {
        data: {
          results: [
            {
              id: 1,
              name: "Spider-Man",
              description: "Friendly neighborhood Spider-Man.",
              thumbnail: {
                path: "http://example.com/spiderman",
                extension: "jpg",
              },
            },
          ],
        },
      },
    };

    (api.get as jest.Mock).mockResolvedValue(apiResponse);

    const heroDetails = await getDetailHero(1);

    expect(api.get).toHaveBeenCalledWith(
      `characters/1?ts=${time}&apikey=${publicKey}&hash=${hash}`
    );
    expect(heroDetails).toEqual([
      {
        id: 1,
        name: "Spider-Man",
        description: "Friendly neighborhood Spider-Man.",
        thumbnail: "http://example.com/spiderman.jpg",
      },
    ]);
  });

  it("should handle API errors and log them", async () => {
    const publicKey = "d724d0ec5f7dfbf8641faecb901e8229";
    const time = 1234567890;
    const hash = "hash1234567890";
    (api.get as jest.Mock).mockRejectedValue(new Error("API error"));

    const heroDetails = await getDetailHero(1);

    expect(api.get).toHaveBeenCalledWith(
      `characters/1?ts=${time}&apikey=${publicKey}&hash=${hash}`
    );
    expect(heroDetails).toBeUndefined();
    expect(console.log).toHaveBeenCalledWith(new Error("API error"));
  });
});

describe("getComics function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch hero comics from the API and return formatted data", async () => {
    const publicKey = "d724d0ec5f7dfbf8641faecb901e8229";
    const time = 1234567890;
    const hash = "hash1234567890";
    const apiResponse = {
      data: {
        data: {
          results: [
            {
              id: 1001,
              name: "The Amazing Spider-Man #1",
              description: "The first appearance of Spider-Man.",
              thumbnail: {
                path: "http://example.com/spiderman-comic",
                extension: "jpg",
              },
            },
          ],
        },
      },
    };

    (api.get as jest.Mock).mockResolvedValue(apiResponse);

    const comics = await getComics(1);

    expect(api.get).toHaveBeenCalledWith(
      `characters/1/comics?ts=${time}&apikey=${publicKey}&hash=${hash}`
    );
    expect(comics).toEqual([
      {
        id: 1001,
        name: "The Amazing Spider-Man #1",
        description: "The first appearance of Spider-Man.",
        thumbnail: "http://example.com/spiderman-comic.jpg",
      },
    ]);
  });

  it("should handle API errors and log them", async () => {
    const publicKey = "d724d0ec5f7dfbf8641faecb901e8229";
    const time = 1234567890;
    const hash = "hash1234567890";
    (api.get as jest.Mock).mockRejectedValue(new Error("API error"));

    const comics = await getComics(1);

    expect(api.get).toHaveBeenCalledWith(
      `characters/1/comics?ts=${time}&apikey=${publicKey}&hash=${hash}`
    );
    expect(comics).toBeUndefined(); // Function should return undefined when there's an error
    expect(console.log).toHaveBeenCalledWith(new Error("API error")); // Check if the error was logged
  });
});
