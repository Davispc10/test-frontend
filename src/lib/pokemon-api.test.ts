import { getPokemonDetails, getPokemons } from './pokemon-api';

// Mock the global fetch
global.fetch = jest.fn();

describe('Pokemon API Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getPokemonDetails', () => {
        it('should return a default image if official-artwork is missing', async () => {
            const mockBasicInfo = {
                id: 9999,
                name: 'missingno',
                sprites: {
                    other: {
                        'official-artwork': {
                            front_default: null // missing image
                        }
                    }
                },
                types: [],
                stats: [],
                abilities: []
            };

            // Mock fetch for the basic details call
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockBasicInfo
            });
            // Mock fetch for the species call to fail (simulate missing species data)
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false
            });

            const result = await getPokemonDetails(9999);

            // Verifica o fallback nativo da PokeAPI para o sprite principal
            expect(result.imageUrl).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9999.png');
        });

        it('should return "Descrição não informada" if species data has no flavor text entries', async () => {
            const mockBasicInfo = {
                id: 1,
                name: 'bulbasaur',
                sprites: {
                    other: { 'official-artwork': { front_default: 'img.png' } }
                },
                types: [],
                stats: [],
                abilities: []
            };

            const mockSpecies = {
                flavor_text_entries: [], // completely empty
                genera: [],
                gender_rate: 1,
                varieties: []
            };

            // Basic info fetch
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockBasicInfo
            });
            // Species fetch
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockSpecies
            });

            const result = await getPokemonDetails(1);
            expect(result.flavor_text).toBe('Descrição não informada');
        });

        it('should correctly format flavor text if available in english', async () => {
            const mockBasicInfo = {
                id: 1,
                name: 'bulbasaur',
                sprites: {
                    other: { 'official-artwork': { front_default: 'img.png' } }
                },
                types: [],
                stats: [],
                abilities: []
            };

            const mockSpecies = {
                flavor_text_entries: [
                    { language: { name: 'en' }, flavor_text: 'A strange seed was\nplanted on its\fback at birth.' }
                ],
                genera: [],
                gender_rate: 1,
                varieties: []
            };

            // Basic info fetch
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockBasicInfo
            });
            // Species fetch
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockSpecies
            });

            const result = await getPokemonDetails(1);

            // O código de formatação limpa caracteres de controle como \f
            expect(result.flavor_text).toBe('A strange seed was\nplanted on its back at birth.');
        });
    });

    describe('getPokemons', () => {
        it('should fetch and format a paginated list of pokemons', async () => {
            const mockListResponse = {
                count: 1302,
                next: 'has_more',
                previous: null,
                results: [
                    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
                ]
            };

            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockListResponse
            });

            const result = await getPokemons(2, 0);

            expect(result.results).toHaveLength(2);
            expect(result.results[0].id).toBe(1);
            expect(result.results[0].imageUrl).toContain('1.png');
            expect(result.results[1].id).toBe(2);
            expect(result.results[1].imageUrl).toContain('2.png');
        });
    });
});
