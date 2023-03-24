import { getTotalHeroCount } from "../api/getHeroCount";

describe("test getHeroCount", function () {
  it("should list the total hero amount", function () {
    getTotalHeroCount()
      .then((result) => {
        expect(result).toBeGreaterThan(0);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
