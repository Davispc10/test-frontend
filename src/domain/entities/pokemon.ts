/**
 * Entidades de domínio — Contratos para o frontend.
 * Regras de negócio (valores default) são aplicadas nos Mappers, NUNCA nos componentes.
 */

export interface IPokemonSprites {
  frontDefault: string;
  frontShiny: string | null;
  backDefault: string | null;
  backShiny: string | null;
  other?: {
    officialArtwork?: string;
    "dream-world"?: string;
  };
}

export interface IPokemonStat {
  name: string;
  value: number;
}

export interface IPokemonAbility {
  name: string;
  isHidden: boolean;
}

/** Flavor text histórico de uma versão de jogo */
export interface IPokemonFlavorText {
  text: string;
  version: string;
}

/** Pokémon completo — usado na página de detalhes e no Advanced Modal */
export interface IPokemon {
  id: number;
  name: string;
  description: string;
  types: string[];
  height: number;
  weight: number;
  stats: IPokemonStat[];
  sprites: IPokemonSprites;
  abilities: IPokemonAbility[];
  generation: string;
  baseExperience: number;
  // Dados da species
  captureRate: number;
  baseHappiness: number;
  eggGroups: string[];
  evolutionChainUrl: string;
  habitat: string | null;
  color: string;
  flavorTexts: IPokemonFlavorText[];
  varieties: string[];
}

/** Nó da árvore de evolução */
export interface IEvolutionChainNode {
  name: string;
  evolvesTo: IEvolutionChainNode[];
}

/** Item resumido — usado na listagem de cards */
export interface IPokemonListItem {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  baseExperience: number;
  stats: IPokemonStat[];
}

/** Resposta paginada da listagem */
export interface IPokemonList {
  items: IPokemonListItem[];
  totalCount: number;
  nextPage: number | null;
  previousPage: number | null;
}
