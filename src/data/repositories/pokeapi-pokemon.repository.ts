import type {
  IPokemonRepository,
  IGetPokemonListParams,
} from "@/domain/repositories/pokemon-repository.interface";
import type {
  IPokemon,
  IPokemonList,
  IPokemonListItem,
  IEvolutionChainNode,
} from "@/domain/entities/pokemon";
import { PokeApiClient } from "@/infra/http/pokeapi-client";
import {
  mapPokemonListResponse,
  mapPokemonListItemFromResponse,
  mapPokemonDetails,
  mapEvolutionChain,
} from "@/data/mappers/pokemon.mapper";
import type {
  IPokeApiPokemonListResponse,
  IPokeApiPokemonResponse,
  IPokeApiPokemonSpeciesResponse,
  IPokeApiTypeResponse,
  IPokeApiGenerationResponse,
  IPokeApiColorResponse,
  IPokeApiHabitatResponse,
  IPokeApiEvolutionChainResponse,
} from "@/data/mappers/pokemon.dto";
import { API_SEARCH_LIMIT } from "@/lib/constants";

function extractIdFromUrl(url: string): number {
  const parts = url.trim().replace(/\/$/, "").split("/");
  const id = parseInt(parts[parts.length - 1], 10);
  return isNaN(id) ? 0 : id;
}


function applyStatFilters(
  items: IPokemonListItem[],
  minAttack?: number,
  maxAttack?: number,
  minExperience?: number,
  maxExperience?: number
): IPokemonListItem[] {
  return items.filter((item) => {
    const attack = item.stats.find((s) => s.name === "attack")?.value ?? 0;
    const exp = item.baseExperience;
    if (minAttack !== undefined && attack < minAttack) return false;
    if (maxAttack !== undefined && attack > maxAttack) return false;
    if (minExperience !== undefined && exp < minExperience) return false;
    if (maxExperience !== undefined && exp > maxExperience) return false;
    return true;
  });
}

export class PokeApiPokemonRepository implements IPokemonRepository {
  constructor(private readonly client: PokeApiClient) {}

  // ─── Métodos privados de busca por filtros de species ───

  private async getTypePokemonEntries(
    typeName: string
  ): Promise<Array<{ id: number; name: string }>> {
    const typeData = await this.client.get<IPokeApiTypeResponse>(
      `/type/${typeName}`
    );
    return typeData.pokemon
      .map((p) => ({
        id: extractIdFromUrl(p.pokemon.url),
        name: p.pokemon.name,
      }))
      .filter((p) => p.id > 0)
      .sort((a, b) => a.id - b.id);
  }

  private async getGenerationPokemonIds(generation: string): Promise<Set<number>> {
    const data = await this.client.get<IPokeApiGenerationResponse>(
      `/generation/${generation}`
    );
    return new Set(
      data.pokemon_species
        .map((s) => extractIdFromUrl(s.url))
        .filter((id) => id > 0)
    );
  }

  private async getColorPokemonIds(color: string): Promise<Set<number>> {
    const data = await this.client.get<IPokeApiColorResponse>(
      `/pokemon-color/${color}`
    );
    return new Set(
      data.pokemon_species
        .map((s) => extractIdFromUrl(s.url))
        .filter((id) => id > 0)
    );
  }

  private async getHabitatPokemonIds(habitat: string): Promise<Set<number>> {
    const data = await this.client.get<IPokeApiHabitatResponse>(
      `/pokemon-habitat/${habitat}`
    );
    return new Set(
      data.pokemon_species
        .map((s) => extractIdFromUrl(s.url))
        .filter((id) => id > 0)
    );
  }

  // ─── Método principal ───

  async getList(params: IGetPokemonListParams): Promise<IPokemonList> {
    const {
      types,
      generation,
      color,
      habitat,
      search,
      page,
      limit,
      minAttack,
      maxAttack,
      minExperience,
      maxExperience,
    } = params;
    const offset = (page - 1) * limit;
    const hasTypeFilter = types && types.length > 0;
    const hasSpeciesFilter = !!(generation || color || habitat);

    if (hasTypeFilter || hasSpeciesFilter) {
      return this.getListByFilters({
        types,
        generation,
        color,
        habitat,
        search,
        page,
        limit,
        offset,
        minAttack,
        maxAttack,
        minExperience,
        maxExperience,
      });
    }

    if (search && search.trim()) {
      return this.getListBySearch({
        search: search.trim().toLowerCase(),
        page,
        limit,
        offset,
        minAttack,
        maxAttack,
        minExperience,
        maxExperience,
      });
    }

    return this.getDefaultList({ page, limit, offset, minAttack, maxAttack, minExperience, maxExperience });
  }

  /**
   * Listagem com filtros combinados:
   * - Types: OR (união dentro da categoria)
   * - Generation / Color / Habitat: AND (intersecção entre categorias)
   * - Tipos ∩ (Generation ∩ Color ∩ Habitat)
   */
  private async getListByFilters(args: {
    types?: string[];
    generation?: string;
    color?: string;
    habitat?: string;
    search?: string;
    page: number;
    limit: number;
    offset: number;
    minAttack?: number;
    maxAttack?: number;
    minExperience?: number;
    maxExperience?: number;
  }): Promise<IPokemonList> {
    const { types, generation, color, habitat, search, page, limit, offset } = args;

    // Fase 1: Construir conjunto filtrado de IDs (com nomes quando disponível)
    type Entry = { id: number; name?: string };
    let filteredEntries: Entry[] | null = null;

    // Types (OR) — fornece nomes
    if (types && types.length > 0) {
      const typeArrays = await Promise.all(
        types.map((t) => this.getTypePokemonEntries(t))
      );
      const unionMap = new Map<number, string>();
      for (const entries of typeArrays) {
        for (const e of entries) {
          if (!unionMap.has(e.id)) unionMap.set(e.id, e.name);
        }
      }
      filteredEntries = Array.from(unionMap.entries())
        .map(([id, name]) => ({ id, name }))
        .sort((a, b) => a.id - b.id);
    }

    // Generation (AND) — fornece apenas IDs
    if (generation) {
      const genIds = await this.getGenerationPokemonIds(generation);
      if (filteredEntries) {
        filteredEntries = filteredEntries.filter((e) => genIds.has(e.id));
      } else {
        filteredEntries = Array.from(genIds)
          .sort((a, b) => a - b)
          .map((id) => ({ id }));
      }
    }

    // Color (AND) — fornece apenas IDs
    if (color) {
      const colorIds = await this.getColorPokemonIds(color);
      if (filteredEntries) {
        filteredEntries = filteredEntries.filter((e) => colorIds.has(e.id));
      } else {
        filteredEntries = Array.from(colorIds)
          .sort((a, b) => a - b)
          .map((id) => ({ id }));
      }
    }

    // Habitat (AND) — fornece apenas IDs
    if (habitat) {
      const habitatIds = await this.getHabitatPokemonIds(habitat);
      if (filteredEntries) {
        filteredEntries = filteredEntries.filter((e) => habitatIds.has(e.id));
      } else {
        filteredEntries = Array.from(habitatIds)
          .sort((a, b) => a - b)
          .map((id) => ({ id }));
      }
    }

    if (!filteredEntries || filteredEntries.length === 0) {
      return { items: [], totalCount: 0, nextPage: null, previousPage: null };
    }

    // Fase 2: Aplicar filtro de nome (apenas quando temos nomes da busca por tipo)
    const entriesHaveNames = filteredEntries.some((e) => e.name);
    if (search && search.trim() && entriesHaveNames) {
      const term = search.trim().toLowerCase();
      filteredEntries = filteredEntries.filter(
        (e) => !e.name || e.name.includes(term)
      );
    }

    const totalCount = filteredEntries.length;
    const paginated = filteredEntries.slice(offset, offset + limit);

    if (paginated.length === 0) {
      return { items: [], totalCount, nextPage: null, previousPage: null };
    }

    // Fase 3: Batch-fetch individual para a página
    const pokemonDetails = await Promise.all(
      paginated.map((e) =>
        this.client.get<IPokeApiPokemonResponse>(`/pokemon/${e.id}`)
      )
    );

    let items = pokemonDetails.map(mapPokemonListItemFromResponse);

    // Filtro de nome pós-fetch (para entradas sem nome = filtros de species puros)
    if (search && search.trim() && !entriesHaveNames) {
      const term = search.trim().toLowerCase();
      items = items.filter((i) => i.name.includes(term));
    }

    items = applyStatFilters(
      items,
      args.minAttack,
      args.maxAttack,
      args.minExperience,
      args.maxExperience
    );

    return {
      items,
      totalCount,
      nextPage: offset + limit < totalCount ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
  }

  private async getListBySearch(args: {
    search: string;
    page: number;
    limit: number;
    offset: number;
    minAttack?: number;
    maxAttack?: number;
    minExperience?: number;
    maxExperience?: number;
  }): Promise<IPokemonList> {
    const { search, page, limit, offset } = args;
    const listDto = await this.client.get<IPokeApiPokemonListResponse>(
      `/pokemon?limit=${API_SEARCH_LIMIT}&offset=0`
    );
    const filtered = listDto.results.filter((r) =>
      r.name.toLowerCase().includes(search)
    );
    const totalCount = filtered.length;
    const paginated = filtered.slice(offset, offset + limit);
    if (paginated.length === 0) {
      return { items: [], totalCount, nextPage: null, previousPage: null };
    }
    const pokemonDetails = await Promise.all(
      paginated.map((r) =>
        this.client.get<IPokeApiPokemonResponse>(
          `/pokemon/${extractIdFromUrl(r.url)}`
        )
      )
    );
    let items = pokemonDetails.map(mapPokemonListItemFromResponse);
    items = applyStatFilters(
      items,
      args.minAttack,
      args.maxAttack,
      args.minExperience,
      args.maxExperience
    );
    return {
      items,
      totalCount,
      nextPage: offset + limit < totalCount ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
  }

  private async getDefaultList(args: {
    page: number;
    limit: number;
    offset: number;
    minAttack?: number;
    maxAttack?: number;
    minExperience?: number;
    maxExperience?: number;
  }): Promise<IPokemonList> {
    const { limit, offset } = args;
    const listDto = await this.client.get<IPokeApiPokemonListResponse>(
      `/pokemon?limit=${limit}&offset=${offset}`
    );
    const pokemonDetails = await Promise.all(
      listDto.results.map((r) =>
        this.client.get<IPokeApiPokemonResponse>(
          `/pokemon/${extractIdFromUrl(r.url)}`
        )
      )
    );
    let items = pokemonDetails.map(mapPokemonListItemFromResponse);
    items = applyStatFilters(
      items,
      args.minAttack,
      args.maxAttack,
      args.minExperience,
      args.maxExperience
    );
    return mapPokemonListResponse(listDto, offset, limit, items);
  }

  async getById(id: string | number): Promise<IPokemon> {
    const numId = typeof id === "string" ? parseInt(id, 10) : id;
    const [pokemonDto, speciesDto] = await Promise.all([
      this.client.get<IPokeApiPokemonResponse>(`/pokemon/${id}`),
      this.client.get<IPokeApiPokemonSpeciesResponse>(
        `/pokemon-species/${numId}`
      ),
    ]);
    return mapPokemonDetails(pokemonDto, speciesDto);
  }

  async getEvolutionChain(url: string): Promise<IEvolutionChainNode | null> {
    if (!url?.trim()) return null;
    const dto = await this.client.get<IPokeApiEvolutionChainResponse>(url);
    return mapEvolutionChain(dto?.chain);
  }
}

