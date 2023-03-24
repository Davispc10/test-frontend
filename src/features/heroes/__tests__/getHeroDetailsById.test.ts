import { getHeroDetailsById } from "../api/getHeroDetailsById";

describe("test getHeroDetailsById", function () {
  it("should list all details from a hero", function () {
    getHeroDetailsById({
      id: 1011334,
    }).then(function (response) {
      expect(response).toBeDefined();
    });
  });
});
