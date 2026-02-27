// src/lib/pokemon-api.ts

export const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

export interface PokemonListItem {
    name: string;
    url: string;
    id: number;
    imageUrl: string;
    types: {
        type: {
            name: string;
        };
    }[];
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

export interface ItemListItem {
    name: string;
    url: string;
    id: number;
    imageUrl: string;
}

export interface ItemListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ItemListItem[];
}

export interface ItemDetail {
    id: number;
    name: string;
    cost: number;
    flavor_text_entries: {
        text: string;
        language: { name: string };
    }[];
    sprites: {
        default: string;
    };
    category: {
        name: string;
    };
    attributes: {
        name: string;
    }[];
}

export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
    types: {
        type: {
            name: string;
        };
    }[];
    imageUrl: string;
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
    // Campos estendidos para o novo design
    flavor_text?: string;
    category?: string;
    abilities?: {
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        description?: string;
    }[];
    evolution_chain?: any;
    gender_rate?: number;
    cries?: {
        latest: string;
        legacy: string;
    };
    mega_evolutions?: MegaEvolution[];
    // Novos campos recomendados
    habitat?: string;
    base_experience?: number;
    capture_rate?: number;
    growth_rate?: string;
    egg_groups?: { name: string }[];
    base_happiness?: number;
}

export interface PokemonSpecies {
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
        };
    }[];
    genera: {
        genus: string;
        language: {
            name: string;
        };
    }[];
    evolution_chain: {
        url: string;
    };
    gender_rate: number;
    capture_rate: number;
    base_happiness: number;
    growth_rate: {
        name: string;
    };
    egg_groups: {
        name: string;
    }[];
    habitat: {
        name: string;
    } | null;
    varieties: {
        is_default: boolean;
        pokemon: {
            name: string;
            url: string;
        };
    }[];
}

export interface MegaEvolution {
    name: string;
    id: string;
    imageUrl: string;
}

export const LEGENDARY_IDS = [144, 145, 146, 150, 243, 244, 245, 249, 250, 377, 378, 379, 380, 381, 382, 383, 384, 480, 481, 482, 483, 484, 485, 486, 487, 488, 638, 639, 640, 641, 642, 643, 644, 645, 646, 716, 717, 718, 772, 773, 785, 786, 787, 788, 789, 790, 791, 792, 800, 888, 889, 890, 891, 892, 894, 895, 896, 897, 898, 905, 1001, 1002, 1003, 1004, 1007, 1008, 1014, 1015, 1016, 1017, 1024];

export const MYTHICAL_IDS = [151, 251, 385, 386, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719, 720, 721, 801, 802, 807, 808, 809, 893, 1025];

export const ULTRABEAST_IDS = [793, 794, 795, 796, 797, 798, 799, 803, 804, 805, 806];
export const REGIONS = [
    { name: "Kanto", min: 1, max: 151 },
    { name: "Johto", min: 152, max: 251 },
    { name: "Hoenn", min: 252, max: 386 },
    { name: "Sinnoh", min: 387, max: 493 },
    { name: "Unova", min: 494, max: 649 },
    { name: "Kalos", min: 650, max: 721 },
    { name: "Alola", min: 722, max: 809 },
    { name: "Galar", min: 810, max: 898 },
    { name: "Paldea", min: 899, max: 1025 }
];


/**
 * Busca uma lista de Pokémons, opcionalmente filtrada por nome.
 * @param limit Quantidade por página.
 * @param offset Ponto de partida.
 * @param search Termo de busca opcional.
 */
export async function getPokemons(
    limit: number = 20,
    offset: number = 0,
    search?: string,
    minId?: number,
    maxId?: number,
    types?: string[],
    rarityFilter?: "legendary" | "mythical" | "ultrabeast" | null
): Promise<PokemonListResponse> {
    // Se houver busca ou filtros avançados, filtragem manual
    if (search || (minId !== undefined || maxId !== undefined) || (types && types.length > 0) || rarityFilter) {
        // Buscamos todos ou um limite grande
        const allRes = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=2000`, {
            next: { revalidate: 3600 },
        });
        const allData = await allRes.json();

        let filtered = allData.results.map((pokemon: any) => {
            const parts = pokemon.url.split('/');
            const id = parseInt(parts[parts.length - 2], 10);
            return {
                ...pokemon,
                id,
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            };
        });

        // Filtro por Nome ou ID
        if (search) {
            const searchLower = search.toLowerCase();
            const searchId = parseInt(search, 10);
            filtered = filtered.filter((p: any) =>
                p.name.toLowerCase().includes(searchLower) ||
                (!isNaN(searchId) && p.id === searchId) ||
                p.id.toString() === searchLower
            );
        }

        // Filtro por Geração (ID Range)
        if (minId !== undefined) {
            filtered = filtered.filter((p: any) => p.id >= minId);
        }
        if (maxId !== undefined) {
            filtered = filtered.filter((p: any) => p.id <= maxId);
        }

        // Filtro por Tipo (Suporta múltiplos tipos - Interseção)
        if (types && types.length > 0) {
            try {
                let intersectionNames: Set<string> | null = null;

                for (const type of types) {
                    const typeRes = await fetch(`${POKEAPI_BASE_URL}/type/${type.toLowerCase()}`, {
                        next: { revalidate: 3600 }
                    });

                    if (typeRes.ok) {
                        const typeData = await typeRes.json();
                        const currentTypeNames = new Set<string>(typeData.pokemon.map((p: any) => p.pokemon.name));

                        if (intersectionNames === null) {
                            intersectionNames = currentTypeNames;
                        } else {
                            // Intersect with existing names
                            const newIntersection = new Set<string>();
                            for (const name of intersectionNames) {
                                if (currentTypeNames.has(name)) {
                                    newIntersection.add(name);
                                }
                            }
                            intersectionNames = newIntersection;
                        }
                    }
                }

                if (intersectionNames) {
                    filtered = filtered.filter((p: any) => intersectionNames!.has(p.name));
                }
            } catch (err) {
                console.warn(`Failed to fetch types ${types.join(",")}`, err);
            }
        }

        // Filtro por Raridade
        if (rarityFilter) {
            filtered = filtered.filter((p: any) => {
                if (rarityFilter === "legendary") return LEGENDARY_IDS.includes(p.id);
                if (rarityFilter === "mythical") return MYTHICAL_IDS.includes(p.id);
                if (rarityFilter === "ultrabeast") return ULTRABEAST_IDS.includes(p.id);
                return true;
            });
        }

        const paginated = filtered.slice(offset, offset + limit);

        // Fetch basic info (types) for the paginated results in parallel
        const resultsWithTypes = await Promise.all(
            paginated.map(async (p: any) => {
                try {
                    const basicInfo = await getPokemonBasicInfo(p.id);
                    return {
                        ...p,
                        types: basicInfo.types
                    };
                } catch (err) {
                    return { ...p, types: [] };
                }
            })
        );

        return {
            count: filtered.length,
            next: filtered.length > offset + limit ? "has_more" : null,
            previous: offset > 0 ? "has_prev" : null,
            results: resultsWithTypes
        };
    }

    const url = new URL(`${POKEAPI_BASE_URL}/pokemon`);
    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("offset", offset.toString());

    const res = await fetch(url.toString(), {
        next: { revalidate: 30 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch pokemons: ${res.statusText}`);
    }

    const data = await res.json();

    // Fetch basic info (types) for the paginated results in parallel
    const transformedResults = await Promise.all(
        data.results.map(async (pokemon: any) => {
            const parts = pokemon.url.split('/');
            const id = parseInt(parts[parts.length - 2], 10);
            try {
                const basicInfo = await getPokemonBasicInfo(id);
                return {
                    ...pokemon,
                    id,
                    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                    types: basicInfo.types
                };
            } catch (err) {
                return {
                    ...pokemon,
                    id,
                    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                    types: []
                };
            }
        })
    );

    return {
        ...data,
        results: transformedResults
    };
}

/**
 * Versão leve de busca de detalhes, contendo apenas o essencial para a listagem (tipos).
 * Evita o processamento pesado de tradução e dados de espécie.
 */
async function getPokemonBasicInfo(id: string | number) {
    const res = await fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch basic pokemon info");
    return res.json();
}

/**
 * Função utilitária para traduzir texto usando a API gratuita MyMemory.
 * Usamos para traduzir descrições e categorias do inglês para o português.
 */
async function translateText(text: string): Promise<string> {
    if (!text || text === "Unknown" || text === "Descrição não informada") return text;

    try {
        const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt-BR&dt=t&q=' + encodeURIComponent(text);

        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            if (data && data[0]) {
                return data[0].map((s: any) => s[0]).join('');
            }
        }
    } catch (e) {
        console.warn("Translation failed for text:", text.substring(0, 20) + "...");
    }

    return text;
}

/**
 * Busca os detalhes estruturais e status de um único Pokémon.
 * Integra dados de espécie (descrição/categoria).
 * @param id ou name do Pokémon.
 */
export async function getPokemonDetails(id: string | number): Promise<PokemonDetail> {
    const res = await fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`, {
        next: { revalidate: 30 },
    });

    if (!res.ok) {
        if (res.status === 404) {
            throw new Error(`Pokemon com o ID/Nome ${id} não foi encontrado.`);
        }
        throw new Error(`Failed to fetch pokemon details: ${res.statusText}`);
    }

    const basicInfo = await res.json();

    // Fallback de imagem
    const imageUrl = basicInfo.sprites.other["official-artwork"].front_default ||
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${basicInfo.id}.png` ||
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

    let flavor = "Descrição não informada";
    let category = "Unknown";
    let evolutionChain = null;
    let genderRate = -1;
    let megaEvolutions: MegaEvolution[] = [];

    let speciesData: PokemonSpecies | null = null;

    // Buscar dados extras de espécie (Flavor Text e Genus)
    try {
        const speciesRes = await fetch(`${POKEAPI_BASE_URL}/pokemon-species/${id}`, {
            next: { revalidate: 30 },
        });

        if (speciesRes.ok) {
            speciesData = await speciesRes.json();
            if (speciesData) {
                let nativeFlavor = speciesData.flavor_text_entries.find(e => e.language.name === "pt-BR" || e.language.name === "pt")?.flavor_text;
                if (!nativeFlavor) {
                    const fallbackFlavor = speciesData.flavor_text_entries.find(e => e.language.name === "en")?.flavor_text ||
                        speciesData.flavor_text_entries[0]?.flavor_text || "Descrição não informada";
                    flavor = await translateText(fallbackFlavor.replace(/\f/g, ' '));
                } else {
                    flavor = nativeFlavor.replace(/\f/g, ' ');
                }

                // Pegar a categoria (Genus)
                let nativeCategory = speciesData.genera.find(g => g.language.name === "pt-BR" || g.language.name === "pt")?.genus;
                if (!nativeCategory) {
                    const fallbackCategory = speciesData.genera.find(g => g.language.name === "en")?.genus ||
                        speciesData.genera[0]?.genus || "Unknown";
                    category = await translateText(fallbackCategory);
                } else {
                    category = nativeCategory;
                }

                genderRate = speciesData.gender_rate;

                // Buscar Mega Evoluções (variedades que contêm "mega" no nome e não são o default)
                if (speciesData.varieties) {
                    megaEvolutions = speciesData.varieties
                        .filter(v => !v.is_default && v.pokemon.name.includes("-mega"))
                        .map(v => {
                            const megaId = v.pokemon.url.split('/').filter(Boolean).pop() || "";
                            return {
                                name: v.pokemon.name.replace(/-/g, ' ').toUpperCase(),
                                id: megaId,
                                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${megaId}.png`
                            };
                        });
                }

                // Buscar a cadeia de evolução
                if (speciesData.evolution_chain?.url) {
                    try {
                        const evoRes = await fetch(speciesData.evolution_chain.url, {
                            next: { revalidate: 30 }
                        });
                        if (evoRes.ok) {
                            evolutionChain = await evoRes.json();
                        }
                    } catch (e) {
                        console.warn("Failed to fetch evolution chain");
                    }
                }
            }
        }
    } catch (e) {
        console.warn("Could not fetch species data for pokemon:", id);
    }

    // Buscar descrições das habilidades (opcional para performance, mas vamos tentar as básicas)
    const abilitiesWithData = await Promise.all(
        basicInfo.abilities.map(async (a: any) => {
            try {
                const abRes = await fetch(a.ability.url, { next: { revalidate: 3600 } });
                if (abRes.ok) {
                    const abData = await abRes.json();
                    const ptDesc = abData.flavor_text_entries.find((e: any) => e.language.name === "pt-BR" || e.language.name === "pt")?.flavor_text;
                    let description = "";

                    if (ptDesc) {
                        description = ptDesc;
                    } else {
                        const fallbackDesc = abData.effect_entries.find((e: any) => e.language.name === "en")?.short_effect ||
                            abData.flavor_text_entries.find((e: any) => e.language.name === "en")?.flavor_text || "";
                        description = await translateText(fallbackDesc);
                    }

                    return { ...a, description };
                }
            } catch (e) {
                console.warn("Could not fetch ability description");
            }
            return a;
        })
    );

    return {
        ...basicInfo,
        imageUrl,
        flavor_text: flavor,
        category,
        evolution_chain: evolutionChain,
        gender_rate: genderRate,
        cries: basicInfo.cries,
        mega_evolutions: megaEvolutions,
        habitat: speciesData?.habitat?.name || "Desconhecido",
        capture_rate: speciesData?.capture_rate,
        base_happiness: speciesData?.base_happiness,
        growth_rate: speciesData?.growth_rate?.name,
        egg_groups: speciesData?.egg_groups,
        base_experience: basicInfo.base_experience,
        abilities: abilitiesWithData
    };
}

export function getPokemonRegion(id: number): string {
    if (id >= 1 && id <= 151) return "Kanto";
    if (id >= 152 && id <= 251) return "Johto";
    if (id >= 252 && id <= 386) return "Hoenn";
    if (id >= 387 && id <= 493) return "Sinnoh";
    if (id >= 494 && id <= 649) return "Unova";
    if (id >= 650 && id <= 721) return "Kalos";
    if (id >= 722 && id <= 809) return "Alola";
    if (id >= 810 && id <= 898) return "Galar";
    if (id >= 899 && id <= 1025) return "Paldea";
    return "Desconhecida";
}

/**
 * Busca todas as categorias de itens disponíveis.
 */
export async function getItemCategories(): Promise<{ name: string; url: string }[]> {
    const res = await fetch(`${POKEAPI_BASE_URL}/item-category?limit=100`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch item categories");
    const data = await res.json();
    return data.results;
}

/**
 * Busca uma lista de Itens.
 */
export async function getItems(
    limit: number = 20,
    offset: number = 0,
    search?: string,
    category?: string
): Promise<ItemListResponse> {
    let results: any[] = [];
    let totalCount = 0;

    if (category && category !== "all") {
        // Se houver categoria, buscamos os itens dessa categoria específica
        const res = await fetch(`${POKEAPI_BASE_URL}/item-category/${category}`, { next: { revalidate: 3600 } });
        if (!res.ok) throw new Error(`Failed to fetch items for category: ${category}`);
        const data = await res.json();

        results = data.items.map((item: any) => {
            const id = item.url.split('/').filter(Boolean).pop();
            return {
                ...item,
                id: parseInt(id),
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`
            };
        });
        totalCount = results.length;
    } else {
        // Busca padrão (todos os itens)
        const url = new URL(`${POKEAPI_BASE_URL}/item`);
        url.searchParams.append("limit", search ? "2000" : limit.toString());
        url.searchParams.append("offset", search ? "0" : offset.toString());

        const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
        if (!res.ok) throw new Error("Failed to fetch items");

        const data = await res.json();
        totalCount = data.count;
        results = data.results.map((item: any) => {
            const id = item.url.split('/').filter(Boolean).pop();
            return {
                ...item,
                id: parseInt(id),
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`
            };
        });
    }

    if (search) {
        results = results.filter((i: any) => i.name.toLowerCase().includes(search.toLowerCase()));
        totalCount = results.length;
        results = results.slice(offset, offset + limit);
    } else if (category && category !== "all") {
        // Paginação manual para resultados de categoria
        results = results.slice(offset, offset + limit);
    }

    return {
        count: totalCount,
        next: totalCount > offset + limit ? "has_more" : null,
        previous: offset > 0 ? "has_prev" : null,
        results
    };
}

/**
 * Busca detalhes de um item específico.
 */
export async function getItemDetails(id: string | number): Promise<ItemDetail> {
    const res = await fetch(`${POKEAPI_BASE_URL}/item/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch item details");
    return res.json();
}

