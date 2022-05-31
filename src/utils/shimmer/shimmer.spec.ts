import { shimmer } from ".";

describe("[Utils] shimmer", () => {
  it("should return a string", () => {
    const w = 100;
    const h = 100;
    const pColor = "#F4F4F4";
    const sColor = "#ECECEC";
    const result = shimmer(w, h, pColor, sColor);
    expect(typeof result).toBe("string");
  });
});
