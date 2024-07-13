import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCard from './CharacterCard';

describe('CharacterCard component', () => {
  it('renders correctly with provided props', () => {
    const id = 1;
    const name = 'Test Character';
    const thumbnail = 'https://example.com/test-thumbnail.jpg';

    render(<CharacterCard id={id} name={name} thumbnail={thumbnail} />);

    // Verificando se o nome do personagem está presente
    const characterName = screen.getByText(name);
    expect(characterName).toBeInTheDocument();

    // Verificando se a imagem do personagem está presente
    const imageElement = screen.getByAltText(name);
    expect(imageElement).toBeInTheDocument();

    // Verificando se o link está presente e contém o href correto
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', `/character/${id}`);
  });

  it('navigates to the correct page when clicked', () => {
    const id = 1;
    const name = 'Test Character';
    const thumbnail = 'https://example.com/test-thumbnail.jpg';

    render(<CharacterCard id={id} name={name} thumbnail={thumbnail} />);

    const linkElement = screen.getByRole('link');
    fireEvent.click(linkElement);

  });
});
