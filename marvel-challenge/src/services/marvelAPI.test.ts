
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
