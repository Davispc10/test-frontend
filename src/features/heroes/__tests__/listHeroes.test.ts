import { listHeroes } from "../api/listHeroes";

describe("test listHeroes", function () {
  it("should list heroes", function () {
    listHeroes({
      page: 1,
      nameStartsWith: "Iron",
    })
      .then(function (heroes) {
        expect(heroes).toBeDefined();
        expect(heroes.length).toBeGreaterThan(0);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
});
