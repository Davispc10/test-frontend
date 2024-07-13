import { render, screen, fireEvent } from '@testing-library/react';
import CharacterList from './CharacterList';

describe('CharacterList component', () => {
  const sampleCharacters = [
    { id: 1, name: 'Character One', thumbnail: 'https://example.com/char1.jpg' },
    { id: 2, name: 'Character Two', thumbnail: 'https://example.com/char2.jpg' },
    // Adicione mais personagens de amostra conforme necessário
  ];

  it('renders each character correctly', () => {
    render(<CharacterList characters={sampleCharacters} />);

    sampleCharacters.forEach((character) => {
      // Verificando se o nome de cada personagem está presente
      const characterName = screen.getByText(character.name);
      expect(characterName).toBeInTheDocument();

      // Verificando se a imagem de cada personagem está presente
      const imageElement = screen.getByAltText(character.name);
      expect(imageElement).toBeInTheDocument();
    });
  });

  
});
