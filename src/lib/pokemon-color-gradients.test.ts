import { describe, it, expect } from "vitest";
import { getColorGradient } from "./pokemon-color-gradients";

describe("pokemon-color-gradients", () => {
  describe("getColorGradient", () => {
    it("retorna gradiente para cor conhecida", () => {
      expect(getColorGradient("blue")).toBe(
        "bg-gradient-to-br from-blue-400 to-blue-600"
      );
      expect(getColorGradient("red")).toBe(
        "bg-gradient-to-br from-red-400 to-rose-600"
      );
    });

    it("é case insensível", () => {
      expect(getColorGradient("BLUE")).toBe(
        "bg-gradient-to-br from-blue-400 to-blue-600"
      );
      expect(getColorGradient("Yellow")).toBe(
        "bg-gradient-to-br from-yellow-400 to-amber-500"
      );
    });

    it("retorna string vazia para cor desconhecida", () => {
      expect(getColorGradient("unknown")).toBe("");
      expect(getColorGradient("xyz")).toBe("");
    });

    it("retorna string vazia para null/undefined", () => {
      expect(getColorGradient(null as unknown as string)).toBe("");
      expect(getColorGradient(undefined as unknown as string)).toBe("");
    });
  });
});
