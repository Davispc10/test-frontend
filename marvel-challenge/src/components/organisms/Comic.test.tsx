import { render, screen } from '@testing-library/react';
import ComicList from './ComicList';

describe('ComicList component', () => {
  const sampleComics = [
    { id: 1, title: 'Comic One', thumbnail: 'https://example.com/comic1.jpg' },
    { id: 2, title: 'Comic Two', thumbnail: 'https://example.com/comic2.jpg' },
  ];

  it('renders each comic correctly', () => {
    render(<ComicList comics={sampleComics} />);

    sampleComics.forEach((comic) => {
      // Verificando se o título de cada quadrinho está presente
      const comicTitle = screen.getByText(comic.title);
      expect(comicTitle).toBeInTheDocument();

      // Verificando se a imagem de cada quadrinho está presente
      const imageElement = screen.getByAltText(comic.title);
      expect(imageElement).toBeInTheDocument();
    });
  });
});
