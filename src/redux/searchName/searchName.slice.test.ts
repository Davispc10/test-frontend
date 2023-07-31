import { changeName, default as searchNameReducer } from "./slice";

describe("searchNameSlice", () => {
  const initialState = {
    searchName: "",
  };

  it("should handle changeName reducer", () => {
    const searchName = "Spiderman";
    const action = changeName(searchName);

    const newState = searchNameReducer(initialState, action);

    expect(newState).toEqual({
      searchName: "Spiderman",
    });
  });
});
