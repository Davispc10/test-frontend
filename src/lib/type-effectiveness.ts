// src/lib/type-effectiveness.ts

const typeChart: Record<string, { weaknesses: string[]; resistances: string[]; immunities: string[] }> = {
    normal: { weaknesses: ["fighting"], resistances: [], immunities: ["ghost"] },
    fire: { weaknesses: ["water", "ground", "rock"], resistances: ["fire", "grass", "ice", "bug", "steel", "fairy"], immunities: [] },
    water: { weaknesses: ["grass", "electric"], resistances: ["fire", "water", "ice", "steel"], immunities: [] },
    grass: { weaknesses: ["fire", "ice", "poison", "flying", "bug"], resistances: ["water", "electric", "grass", "ground"], immunities: [] },
    electric: { weaknesses: ["ground"], resistances: ["electric", "flying", "steel"], immunities: [] },
    ice: { weaknesses: ["fire", "fighting", "rock", "steel"], resistances: ["ice"], immunities: [] },
    fighting: { weaknesses: ["flying", "psychic", "fairy"], resistances: ["bug", "rock", "dark"], immunities: [] },
    poison: { weaknesses: ["ground", "psychic"], resistances: ["grass", "fighting", "poison", "bug", "fairy"], immunities: [] },
    ground: { weaknesses: ["water", "grass", "ice"], resistances: ["poison", "rock"], immunities: ["electric"] },
    flying: { weaknesses: ["electric", "ice", "rock"], resistances: ["grass", "fighting", "bug"], immunities: ["ground"] },
    psychic: { weaknesses: ["bug", "ghost", "dark"], resistances: ["fighting", "psychic"], immunities: [] },
    bug: { weaknesses: ["fire", "flying", "rock"], resistances: ["grass", "fighting", "ground"], immunities: [] },
    rock: { weaknesses: ["water", "grass", "fighting", "ground", "steel"], resistances: ["normal", "fire", "poison", "flying"], immunities: [] },
    ghost: { weaknesses: ["ghost", "dark"], resistances: ["poison", "bug"], immunities: ["normal", "fighting"] },
    dragon: { weaknesses: ["ice", "dragon", "fairy"], resistances: ["fire", "water", "electric", "grass"], immunities: [] },
    dark: { weaknesses: ["fighting", "bug", "fairy"], resistances: ["ghost", "dark"], immunities: ["psychic"] },
    steel: { weaknesses: ["fire", "fighting", "ground"], resistances: ["normal", "grass", "ice", "flying", "psychic", "bug", "rock", "dragon", "steel", "fairy"], immunities: ["poison"] },
    fairy: { weaknesses: ["poison", "steel"], resistances: ["fighting", "bug", "dark"], immunities: ["dragon"] },
};

export function getWeaknesses(types: string[]): string[] {
    const scores: Record<string, number> = {};

    // Initialize scores
    Object.keys(typeChart).forEach(type => scores[type] = 1);

    types.forEach(pokemonType => {
        const entry = typeChart[pokemonType.toLowerCase()];
        if (!entry) return;

        entry.weaknesses.forEach(w => scores[w] *= 2);
        entry.resistances.forEach(r => scores[r] *= 0.5);
        entry.immunities.forEach(i => scores[i] *= 0);
    });

    return Object.keys(scores).filter(type => scores[type] > 1);
}

export function getStrengths(types: string[]): string[] {
    const strengths = new Set<string>();

    types.forEach(pokemonType => {
        const typeStr = pokemonType.toLowerCase();
        Object.entries(typeChart).forEach(([defender, entry]) => {
            if (entry.weaknesses.includes(typeStr)) {
                strengths.add(defender);
            }
        });
    });

    return Array.from(strengths);
}

export function getTypeDetails(type: string) {
    const t = type.toLowerCase();
    const entry = typeChart[t];
    if (!entry) return null;

    // For strengths, check who has this type as weakness
    const strengths = Object.keys(typeChart).filter(defender => typeChart[defender].weaknesses.includes(t));

    return {
        strengths,
        weaknesses: entry.weaknesses,
        resistances: entry.resistances,
        immunities: entry.immunities
    };
}

export interface AdvancedMatchups {
    weaknesses4x: string[];
    weaknesses2x: string[];
    resistances05x: string[];
    resistances025x: string[];
    immunities: string[];
}

export function getAdvancedMatchups(types: string[]): AdvancedMatchups {
    const scores: Record<string, number> = {};

    // Initialize all types to 1x multiplier
    Object.keys(typeChart).forEach(type => scores[type] = 1);

    // Apply multipliers for each of the Pokemon's types
    types.forEach(pokemonType => {
        const entry = typeChart[pokemonType.toLowerCase()];
        if (!entry) return;

        entry.weaknesses.forEach(w => scores[w] *= 2);
        entry.resistances.forEach(r => scores[r] *= 0.5);
        entry.immunities.forEach(i => scores[i] *= 0);
    });

    const result: AdvancedMatchups = {
        weaknesses4x: [],
        weaknesses2x: [],
        resistances05x: [],
        resistances025x: [],
        immunities: []
    };

    Object.entries(scores).forEach(([type, multiplier]) => {
        if (multiplier === 4) result.weaknesses4x.push(type);
        else if (multiplier === 2) result.weaknesses2x.push(type);
        else if (multiplier === 0.5) result.resistances05x.push(type);
        else if (multiplier === 0.25) result.resistances025x.push(type);
        else if (multiplier === 0) result.immunities.push(type);
    });

    return result;
}
