import { describe, it, expect } from "vitest";
import { getTypeColor, getTypeBg } from "./pokemon-type-colors";

describe("pokemon-type-colors", () => {
  describe("getTypeColor", () => {
    it("retorna classes para tipo conhecido", () => {
      expect(getTypeColor("fire")).toBe("bg-pokemon-type-fire     text-white");
      expect(getTypeColor("water")).toBe("bg-pokemon-type-water    text-white");
      expect(getTypeColor("electric")).toBe(
        "bg-pokemon-type-electric text-gray-900"
      );
    });

    it("é case insensível", () => {
      expect(getTypeColor("FIRE")).toBe("bg-pokemon-type-fire     text-white");
      expect(getTypeColor("Fire")).toBe("bg-pokemon-type-fire     text-white");
    });

    it("retorna fallback para tipo desconhecido", () => {
      expect(getTypeColor("unknown")).toBe("bg-pokemon-type-normal text-white");
      expect(getTypeColor("")).toBe("bg-pokemon-type-normal text-white");
    });
  });

  describe("getTypeBg", () => {
    it("retorna apenas background para tipo conhecido", () => {
      expect(getTypeBg("fire")).toBe("bg-pokemon-type-fire");
      expect(getTypeBg("grass")).toBe("bg-pokemon-type-grass");
    });

    it("é case insensível", () => {
      expect(getTypeBg("WATER")).toBe("bg-pokemon-type-water");
      expect(getTypeBg("Dragon")).toBe("bg-pokemon-type-dragon");
    });

    it("retorna fallback para tipo desconhecido", () => {
      expect(getTypeBg("unknown")).toBe("bg-pokemon-type-normal");
      expect(getTypeBg("xyz")).toBe("bg-pokemon-type-normal");
    });
  });
});
