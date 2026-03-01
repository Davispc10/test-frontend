import type {
  IPokemon,
  IPokemonList,
  IPokemonListItem,
  IPokemonSprites,
  IPokemonAbility,
  IPokemonStat,
  IPokemonFlavorText,
  IEvolutionChainNode,
} from "@/domain/entities/pokemon";
import type {
  IPokeApiPokemonListResponse,
  IPokeApiPokemonResponse,
  IPokeApiPokemonSpeciesResponse,
  IPokeApiEvolutionChainLink,
} from "./pokemon.dto";
import {
  DEFAULT_POKEMON_IMAGE,
  DEFAULT_POKEMON_DESCRIPTION,
  MAX_FLAVOR_TEXTS,
} from "@/lib/constants";

const GENERATION_LABELS: Record<string, string> = {
  "generation-i": "1ª Geração",
  "generation-ii": "2ª Geração",
  "generation-iii": "3ª Geração",
  "generation-iv": "4ª Geração",
  "generation-v": "5ª Geração",
  "generation-vi": "6ª Geração",
  "generation-vii": "7ª Geração",
  "generation-viii": "8ª Geração",
  "generation-ix": "9ª Geração",
};

function toImageUrl(url: string | null | undefined): string {
  if (url && url.trim().length > 0) return url;
  return DEFAULT_POKEMON_IMAGE;
}

function mapSprites(
  sprites: IPokeApiPokemonResponse["sprites"]
): IPokemonSprites {
  return {
    frontDefault: toImageUrl(sprites?.front_default),
    frontShiny: sprites?.front_shiny ?? null,
    backDefault: sprites?.back_default ?? null,
    backShiny: sprites?.back_shiny ?? null,
    other: {
      officialArtwork:
        sprites?.other?.["official-artwork"]?.front_default ?? undefined,
      "dream-world":
        sprites?.other?.["dream_world"]?.front_default ?? undefined,
    },
  };
}

function mapStats(dto: IPokeApiPokemonResponse): IPokemonStat[] {
  return (
    dto.stats?.map((s) => ({ name: s.stat.name, value: s.base_stat })) ?? []
  );
}

function mapAbilities(dto: IPokeApiPokemonResponse): IPokemonAbility[] {
  return (
    dto.abilities
      ?.sort((a, b) => a.slot - b.slot)
      .map((a) => ({
        name: a.ability.name,
        isHidden: a.is_hidden,
      })) ?? []
  );
}

function extractDescription(species: IPokeApiPokemonSpeciesResponse): string {
  const entries = species?.flavor_text_entries ?? [];
  const pt = entries.find((e) => e.language?.name === "pt");
  const en = entries.find((e) => e.language?.name === "en");
  const text = pt?.flavor_text ?? en?.flavor_text ?? "";
  const normalized = text.replace(/\f/g, " ").replace(/\n/g, " ").trim();
  return normalized.length > 0 ? normalized : DEFAULT_POKEMON_DESCRIPTION;
}

/**
 * Extrai todos os flavor texts em inglês, deduplicados por texto, máximo 5 versões.
 * Regra de negócio: textos vazios ou repetidos são ignorados.
 */
function extractFlavorTexts(
  species: IPokeApiPokemonSpeciesResponse
): IPokemonFlavorText[] {
  const seen = new Set<string>();
  return (species?.flavor_text_entries ?? [])
    .filter((e) => e.language?.name === "en")
    .map((e) => ({
      text: e.flavor_text.replace(/\f/g, " ").replace(/\n/g, " ").trim(),
      version: e.version?.name ?? "",
    }))
    .filter((e) => {
      if (!e.text || seen.has(e.text)) return false;
      seen.add(e.text);
      return true;
    })
    .slice(0, MAX_FLAVOR_TEXTS);
}

function formatGeneration(generationName: string): string {
  return GENERATION_LABELS[generationName] ?? generationName;
}

/**
 * Extrai nomes das variedades não-default (Mega, Alola, Gigantamax, etc.).
 */
function extractVarieties(
  species: IPokeApiPokemonSpeciesResponse
): string[] {
  return (species?.varieties ?? [])
    .filter((v) => !v.is_default)
    .map((v) => v.pokemon?.name ?? "")
    .filter((name) => name.length > 0);
}

/**
 * Mapeia a resposta da evolution-chain para árvore recursiva.
 */
export function mapEvolutionChain(
  link: IPokeApiEvolutionChainLink | null | undefined
): IEvolutionChainNode | null {
  if (!link?.species?.name) return null;
  return {
    name: link.species.name,
    evolvesTo: (link.evolves_to ?? []).map(mapEvolutionChain).filter(Boolean) as IEvolutionChainNode[],
  };
}

/**
 * Mapeia pokemon individual completo para IPokemonListItem.
 */
export function mapPokemonListItemFromResponse(
  dto: IPokeApiPokemonResponse
): IPokemonListItem {
  const officialArtwork =
    dto.sprites?.other?.["official-artwork"]?.front_default ?? null;
  const frontDefault = dto.sprites?.front_default ?? null;
  return {
    id: dto.id,
    name: dto.name ?? "",
    imageUrl: toImageUrl(officialArtwork ?? frontDefault),
    types: dto.types?.map((t) => t.type.name) ?? [],
    baseExperience: dto.base_experience ?? 0,
    stats: mapStats(dto),
  };
}

export function mapPokemonListResponse(
  dto: IPokeApiPokemonListResponse,
  offset: number,
  limit: number,
  items: IPokemonListItem[]
): IPokemonList {
  const totalPages = Math.ceil(dto.count / limit);
  const currentPage = Math.floor(offset / limit) + 1;
  return {
    items,
    totalCount: dto.count,
    nextPage: dto.next && currentPage < totalPages ? currentPage + 1 : null,
    previousPage: dto.previous ? currentPage - 1 : null,
  };
}

/**
 * Mapeia Pokémon + Species para IPokemon.
 * Unifica todos os dados dos dois endpoints em uma entity limpa.
 * Aplica regras de negócio: imagem e descrição default quando ausentes.
 */
export function mapPokemonDetails(
  pokemonDto: IPokeApiPokemonResponse,
  speciesDto: IPokeApiPokemonSpeciesResponse
): IPokemon {
  return {
    id: pokemonDto.id,
    name: pokemonDto.name ?? "",
    description: extractDescription(speciesDto),
    types: pokemonDto.types?.map((t) => t.type.name) ?? [],
    height: pokemonDto.height ?? 0,
    weight: pokemonDto.weight ?? 0,
    stats: mapStats(pokemonDto),
    sprites: mapSprites(pokemonDto.sprites),
    abilities: mapAbilities(pokemonDto),
    generation: formatGeneration(speciesDto?.generation?.name ?? ""),
    baseExperience: pokemonDto.base_experience ?? 0,
    captureRate: speciesDto?.capture_rate ?? 0,
    baseHappiness: speciesDto?.base_happiness ?? 0,
    eggGroups: speciesDto?.egg_groups?.map((g) => g.name) ?? [],
    evolutionChainUrl: speciesDto?.evolution_chain?.url ?? "",
    habitat: speciesDto?.habitat?.name ?? null,
    color: speciesDto?.color?.name ?? "",
    flavorTexts: extractFlavorTexts(speciesDto),
    varieties: extractVarieties(speciesDto),
  };
}
