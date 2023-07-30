import { getHeroes } from "@/services/hooks/getHeroes/useHeroes";
import { api } from "@/services/api";
import md5 from "md5";

jest.mock("@/services/api", () => ({
  api: {
    get: jest.fn(),
  },
}));

jest.mock("md5", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const sampleResponse = {
  data: {
    results: [
      {
        id: 1,
        name: "Iron Man",
        description: "Genius, billionaire, playboy, philanthropist",
        thumbnail: {
          path: "http://example.com/ironman",
          extension: "jpg",
        },
      },
    ],
  },
};

describe("getHeroes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch heroes and return formatted data", async () => {
    const publicKey = "d724d0ec5f7dfbf8641faecb901e8229";
    const time = 1234567890;
    const hash = "hash1234567890";

    (md5 as jest.MockedFunction<typeof md5>).mockReturnValue(hash);

    (api.get as jest.MockedFunction<typeof api.get>).mockResolvedValueOnce(
      sampleResponse
    );

    const heroes = await getHeroes();

    expect(heroes).toEqual([
      {
        id: 1,
        name: "Iron Man",
        description: "Genius, billionaire, playboy, philanthropist",
        thumbnail: "http://example.com/ironman.jpg",
      },
    ]);

    // Verify API call was made with correct parameters
    expect(api.get).toHaveBeenCalledWith(
      `characters?ts=${time}&apikey=${publicKey}&hash=${hash}`
    );
  });
});
