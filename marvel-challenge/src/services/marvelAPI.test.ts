import { getCharacters, getCharacterDetails, getCharacterComics } from './marvelAPI';
import api from './api';


jest.mock('./api');

describe('Marvel API Services', () => {
  // Limpa mock 
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getCharacters', () => {
    it('Buscar os personagens', async () => {
      const mockResponse = {
        data: {
          data: {
            results: [
              {
                id: 1,
                name: 'Iron Man',
                thumbnail: { path: 'http://example.com/ironman', extension: 'jpg' }
              },
              {
                id: 2,
                name: 'Spider-Man',
                thumbnail: { path: 'http://example.com/image_not_available', extension: 'jpg' }
              }
            ]
          }
        }
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getCharacters(1, 'iron');

      expect(api.get).toHaveBeenCalledWith('/characters', {
        params: {
          limit: 20,
          offset: 0,
          nameStartsWith: 'iron',
        }
      });

      expect(result).toEqual([
        { id: 1, name: 'Iron Man', thumbnail: 'http://example.com/ironman.jpg' },
        { id: 2, name: 'Spider-Man', thumbnail: '/marvel-logo.png' }
      ]);
    });

    it('buscar algo vazio', async () => {
      const mockResponse = { data: { data: { results: [] } } };
      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      await getCharacters(1, '');

      expect(api.get).toHaveBeenCalledWith('/characters', {
        params: {
          limit: 20,
          offset: 0,
          nameStartsWith: undefined,
        }
      });
    });
  });

  describe('getCharacterDetails', () => {
    it('buscar detalhes dos personagens', async () => {
      const mockResponse = {
        data: {
          data: {
            results: [
              {
                id: 1,
                name: 'Iron Man',
                description: 'Genius billionaire',
                thumbnail: { path: 'http://example.com/ironman', extension: 'jpg' }
              }
            ]
          }
        }
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getCharacterDetails(1);

      expect(api.get).toHaveBeenCalledWith('/characters/1');

      expect(result).toEqual({
        id: 1,
        name: 'Iron Man',
        description: 'Genius billionaire',
        thumbnail: 'http://example.com/ironman.jpg'
      });
    });

    it('deve trabalhar bem se nao tiver descrição', async () => {
      const mockResponse = {
        data: {
          data: {
            results: [
              {
                id: 1,
                name: 'Iron Man',
                description: '',
                thumbnail: { path: 'http://example.com/ironman', extension: 'jpg' }
              }
            ]
          }
        }
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getCharacterDetails(1);

      expect(result.description).toBe('Descrição não informada');
    });
  });

  describe('getCharacterComics', () => {
    it('buscar os comics de um personagem', async () => {
      const mockResponse = {
        data: {
          data: {
            results: [
              {
                id: 1,
                title: 'Iron Man #1',
                thumbnail: { path: 'http://example.com/comic1', extension: 'jpg' }
              },
              {
                id: 2,
                title: 'Iron Man #2',
                thumbnail: { path: 'http://example.com/image_not_available', extension: 'jpg' }
              }
            ]
          }
        }
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getCharacterComics(1);

      expect(api.get).toHaveBeenCalledWith('/characters/1/comics', {
        params: {
          limit: 10,
        }
      });

      expect(result).toEqual([
        { id: 1, title: 'Iron Man #1', thumbnail: 'http://example.com/comic1.jpg' },
        { id: 2, title: 'Iron Man #2', thumbnail: '/marvel-logo.png' }
      ]);
    });
  });
});