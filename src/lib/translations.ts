export const typeTranslations: Record<string, string> = {
    normal: "Normal",
    fire: "Fogo",
    water: "Água",
    electric: "Elétrico",
    grass: "Planta",
    ice: "Gelo",
    fighting: "Lutador",
    poison: "Venenoso",
    ground: "Terrestre",
    flying: "Voador",
    psychic: "Psíquico",
    bug: "Inseto",
    rock: "Pedra",
    ghost: "Fantasma",
    dragon: "Dragão",
    dark: "Sombrio",
    steel: "Aço",
    fairy: "Fada",
};

export const statTranslations: Record<string, { name: string; short: string }> = {
    hp: { name: "Vida", short: "HP" },
    attack: { name: "Ataque", short: "ATK" },
    defense: { name: "Defesa", short: "DEF" },
    "special-attack": { name: "Ataque Especial", short: "SPA" },
    "special-defense": { name: "Defesa Especial", short: "SPD" },
    speed: { name: "Velocidade", short: "SPE" },
};

export const getTranslatedType = (type: string) => {
    return typeTranslations[type.toLowerCase()] || type;
};

export const getTranslatedStat = (stat: string) => {
    return statTranslations[stat.toLowerCase()] || { name: stat, short: stat.substring(0, 3).toUpperCase() };
};
