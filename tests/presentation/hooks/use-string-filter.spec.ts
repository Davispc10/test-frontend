import { useStringFilterSetup } from "@/presentation/hooks";

describe("UseStringFilter Hook", () => {
  test("Shoul return a filteredArray", () => {
    let filteredArray = [];
    const sut = useStringFilterSetup((array) => {
      filteredArray = array;
    });
    const array = [{ name: "any_name" }, { name: "another_name" }];
    sut("any", array, "name");

    expect(filteredArray).toEqual([{ name: "any_name" }]);
  });

  test("Shoul throw if value is not a string", () => {
    let filteredArray = [];
    const sut = useStringFilterSetup((array) => {
      filteredArray = array;
    });
    const array = [{ name: "any_name" }, { name: 5 }];

    expect(() => sut("any", array, "name")).toThrow(new Error(`name não pode ser utilizada para filtro porque não é uma string`));
  });
});
