import { getComicsByHeroId } from "../api/getComicsByHeroId";

describe("test getComicsByHeroId", function () {
  it("should fetch data from api", async function () {
    const data = await getComicsByHeroId({ id: 1011334 });

    expect(data).toBeDefined();
  });
});
