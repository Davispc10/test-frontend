import {
    getWeaknesses,
    getStrengths,
    getTypeDetails,
    getAdvancedMatchups
} from "./type-effectiveness";

describe("type-effectiveness", () => {
    describe("getWeaknesses", () => {
        it("should return correct weaknesses for a single type (Fire)", () => {
            const weaknesses = getWeaknesses(["fire"]);
            expect(weaknesses).toEqual(["water", "ground", "rock"]);
        });

        it("should return correct weaknesses for dual types (Grass/Poison)", () => {
            // Grass weaknesses: fire, ice, poison, flying, bug
            // Poison resistances: grass, fighting, poison, bug, fairy
            // Poison weaknesses: ground, psychic
            // Grass resistances: water, electric, grass, ground
            const weaknesses = getWeaknesses(["grass", "poison"]);
            expect(weaknesses).toEqual(["fire", "ice", "flying", "psychic"]);
        });

        it("should remove immunity from weaknesses (Flying/Ground)", () => {
            // Flying immunity: ground
            // Ground weakness: water, grass, ice
            const weaknesses = getWeaknesses(["flying", "ground"]);
            expect(weaknesses).toEqual(["water", "ice"]);
        });
    });

    describe("getStrengths", () => {
        it("should return correct strengths for a single type (Water)", () => {
            const strengths = getStrengths(["water"]);
            // Water is strong against Fire, Ground, Rock
            expect(strengths).toEqual(expect.arrayContaining(["fire", "ground", "rock"]));
        });

        it("should return combined strengths for dual types (Fighting/Flying)", () => {
            const strengths = getStrengths(["fighting", "flying"]);
            expect(strengths).toEqual(expect.arrayContaining(["normal", "rock", "steel", "ice", "dark", "grass", "fighting", "bug"]));
        });
    });

    describe("getTypeDetails", () => {
        it("should return all details for a valid type", () => {
            const details = getTypeDetails("electric");
            expect(details).not.toBeNull();
            expect(details?.strengths).toEqual(expect.arrayContaining(["water", "flying"]));
            expect(details?.weaknesses).toEqual(["ground"]);
            expect(details?.resistances).toEqual(["electric", "flying", "steel"]);
            expect(details?.immunities).toEqual([]);
        });

        it("should return null for an invalid type", () => {
            const details = getTypeDetails("invalid_type");
            expect(details).toBeNull();
        });
    });

    describe("getAdvancedMatchups", () => {
        it("should calculate 4x weaknesses correctly (Bug/Grass)", () => {
            // Bug inherits Fire/Flying weakness
            // Grass inherits Fire/Flying weakness
            const matchups = getAdvancedMatchups(["bug", "grass"]);
            expect(matchups.weaknesses4x).toEqual(["fire", "flying"]);
            expect(matchups.weaknesses2x).toEqual(expect.arrayContaining(["poison", "rock", "bug", "ice"]));
        });

        it("should calculate 0.25x resistances correctly (Steel/Fairy)", () => {
            const matchups = getAdvancedMatchups(["steel", "fairy"]);
            expect(matchups.resistances025x).toEqual(["bug"]);
            expect(matchups.immunities).toEqual(["poison", "dragon"]);
        });

        it("should handle single types correctly", () => {
            const matchups = getAdvancedMatchups(["normal"]);
            expect(matchups.weaknesses4x).toEqual([]);
            expect(matchups.weaknesses2x).toEqual(["fighting"]);
            expect(matchups.resistances05x).toEqual([]);
            expect(matchups.resistances025x).toEqual([]);
            expect(matchups.immunities).toEqual(["ghost"]);
        });
    });
});
