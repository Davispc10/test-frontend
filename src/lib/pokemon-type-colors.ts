/**
 * Mapeamento de tipos Pokémon para classes Tailwind.
 * Strings completas e literais para garantir que o scanner JIT do Tailwind
 * inclua as classes no build de produção.
 * Cores baseadas no UI Kit do Figma (PLANO_DE_ACAO.md).
 */
const POKEMON_TYPE_COLORS: Record<string, string> = {
  normal:   "bg-pokemon-type-normal   text-white",
  fire:     "bg-pokemon-type-fire     text-white",
  water:    "bg-pokemon-type-water    text-white",
  electric: "bg-pokemon-type-electric text-gray-900",
  grass:    "bg-pokemon-type-grass    text-white",
  ice:      "bg-pokemon-type-ice      text-gray-900",
  fighting: "bg-pokemon-type-fighting text-white",
  poison:   "bg-pokemon-type-poison   text-white",
  ground:   "bg-pokemon-type-ground   text-gray-900",
  flying:   "bg-pokemon-type-flying   text-white",
  psychic:  "bg-pokemon-type-psychic  text-white",
  bug:      "bg-pokemon-type-bug      text-white",
  rock:     "bg-pokemon-type-rock     text-white",
  ghost:    "bg-pokemon-type-ghost    text-white",
  dragon:   "bg-pokemon-type-dragon   text-white",
  dark:     "bg-pokemon-type-dark     text-white",
  steel:    "bg-pokemon-type-steel    text-gray-900",
  fairy:    "bg-pokemon-type-fairy    text-gray-900",
};

export function getTypeColor(type: string): string {
  return POKEMON_TYPE_COLORS[type.toLowerCase()] ?? "bg-pokemon-type-normal text-white";
}

/**
 * Retorna apenas a cor de background do tipo (sem a classe de texto).
 * Útil para gradientes e backgrounds de cards.
 */
const POKEMON_TYPE_BG_ONLY: Record<string, string> = {
  normal:   "bg-pokemon-type-normal",
  fire:     "bg-pokemon-type-fire",
  water:    "bg-pokemon-type-water",
  electric: "bg-pokemon-type-electric",
  grass:    "bg-pokemon-type-grass",
  ice:      "bg-pokemon-type-ice",
  fighting: "bg-pokemon-type-fighting",
  poison:   "bg-pokemon-type-poison",
  ground:   "bg-pokemon-type-ground",
  flying:   "bg-pokemon-type-flying",
  psychic:  "bg-pokemon-type-psychic",
  bug:      "bg-pokemon-type-bug",
  rock:     "bg-pokemon-type-rock",
  ghost:    "bg-pokemon-type-ghost",
  dragon:   "bg-pokemon-type-dragon",
  dark:     "bg-pokemon-type-dark",
  steel:    "bg-pokemon-type-steel",
  fairy:    "bg-pokemon-type-fairy",
};

export function getTypeBg(type: string): string {
  return POKEMON_TYPE_BG_ONLY[type.toLowerCase()] ?? "bg-pokemon-type-normal";
}
