// Importando as funções necessárias do testing-library/react
import { render, screen } from '@testing-library/react';
import ComicCard from './ComicCard';

describe('ComicCard component', () => {
  it('renders correctly with provided props', () => {
    const id = 123;
    const title = 'Test Title';
    const thumbnail = 'https://example.com/test-thumbnail.jpg';

    render(<ComicCard id={id} title={title} thumbnail={thumbnail} />);

    // Verificando se o título do quadrinhos está presente
    const comicTitle = screen.getByText(title);
    expect(comicTitle).toBeInTheDocument();

    // Verificando se a imagem do quadrinho está presente
    const imageElement = screen.getByAltText(title);
    expect(imageElement).toBeInTheDocument();

  });
});
