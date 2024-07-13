import api from './api';

// Verificar se eu tenho imagem
function getValidImageUrl(url: string): string {
  if (url.endsWith('image_not_available.jpg')) {
    return '/marvel-logo.png'; 
  }
  return url;
}

export const getCharacters = async (page: number, searchTerm: string) => {
  const offset = (page - 1) * 20;
  const response = await api.get('/characters', {
    params: {
      limit: 20,
      offset,
      nameStartsWith: searchTerm || undefined,
    },
  });

  return response.data.data.results.map((character: any) => ({
    id: character.id,
    name: character.name,
    thumbnail: getValidImageUrl(`${character.thumbnail.path}.${character.thumbnail.extension}`),
  }));
};

export const getCharacterDetails = async (id: number) => {
  const response = await api.get(`/characters/${id}`);

  const character = response.data.data.results[0];
  return {
    id: character.id,
    name: character.name,
    description: character.description || 'Descrição não informada',
    thumbnail: getValidImageUrl(`${character.thumbnail.path}.${character.thumbnail.extension}`),
  };
};

export const getCharacterComics = async (id: number) => {
  const response = await api.get(`/characters/${id}/comics`, {
    params: {
      limit: 10,
    },
  });

  return response.data.data.results.map((comic: any) => ({
    id: comic.id,
    title: comic.title,
    thumbnail: getValidImageUrl(`${comic.thumbnail.path}.${comic.thumbnail.extension}`),
  }));
};