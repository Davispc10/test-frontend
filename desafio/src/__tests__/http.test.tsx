import { http_marvel_get, http_marvel_url } from "../util/http";

describe("Testing request http", () => {
  test("should test request of 100 characteres", () => {
    const promise = http_marvel_get(
      "https://gateway.marvel.com:443/v1/public/characteres",
      {
        params: { limit: 100, offset: 0 },
      }
    );
    promise.then((res) => {
      expect(res.data.result.length).toEqual(100);
    });
  });

  test("should test description of character", () => {
    const promise = http_marvel_get(
      "https://gateway.marvel.com:443/v1/public/characteres",
      {
        params: { limit: 1, offset: 0 },
      }
    );
    promise.then((res) => {
      expect(res.data.result.length).toEqual(1);
      const description = res.data.result[0].description;
      expect(description).not.toBeUndefined();
    });
  });
});
