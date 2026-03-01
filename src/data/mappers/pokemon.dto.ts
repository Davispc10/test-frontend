/**
 * DTOs da PokéAPI v2 — estrutura bruta retornada pela API.
 * Não usar diretamente nos componentes.
 */

export interface IPokeApiPokemonListResult {
  name: string;
  url: string;
}

export interface IPokeApiPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokeApiPokemonListResult[];
}

export interface IPokeApiSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  other?: {
    "official-artwork"?: { front_default?: string };
    "dream_world"?: { front_default?: string };
  };
}

export interface IPokeApiPokemonType {
  slot: number;
  type: { name: string; url: string };
}

export interface IPokeApiStat {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
}

export interface IPokeApiAbility {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}

export interface IPokeApiPokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: IPokeApiSprites;
  types: IPokeApiPokemonType[];
  stats: IPokeApiStat[];
  abilities: IPokeApiAbility[];
}

export interface IPokeApiFlavorTextEntry {
  flavor_text: string;
  language: { name: string };
  version: { name: string; url: string };
}

export interface IPokeApiPokemonSpeciesVariety {
  is_default: boolean;
  pokemon: { name: string; url: string };
}

export interface IPokeApiPokemonSpeciesResponse {
  id: number;
  name: string;
  flavor_text_entries: IPokeApiFlavorTextEntry[];
  generation: { name: string; url: string };
  capture_rate: number;
  base_happiness: number;
  egg_groups: Array<{ name: string; url: string }>;
  evolution_chain: { url: string };
  habitat: { name: string; url: string } | null;
  color: { name: string; url: string };
  varieties?: IPokeApiPokemonSpeciesVariety[];
}

/** Resposta de /type/{name} */
export interface IPokeApiTypeResponse {
  id: number;
  name: string;
  pokemon: Array<{
    pokemon: { name: string; url: string };
    slot: number;
  }>;
}

/** Resposta de /generation/{name} */
export interface IPokeApiGenerationResponse {
  id: number;
  name: string;
  pokemon_species: Array<{ name: string; url: string }>;
}

/** Resposta de /pokemon-color/{name} */
export interface IPokeApiColorResponse {
  id: number;
  name: string;
  pokemon_species: Array<{ name: string; url: string }>;
}

/** Resposta de /pokemon-habitat/{name} */
export interface IPokeApiHabitatResponse {
  id: number;
  name: string;
  pokemon_species: Array<{ name: string; url: string }>;
}

/** Resposta de /evolution-chain/{id} */
export interface IPokeApiEvolutionChainLink {
  species: { name: string; url: string };
  evolves_to: IPokeApiEvolutionChainLink[];
}

export interface IPokeApiEvolutionChainResponse {
  chain: IPokeApiEvolutionChainLink;
}
