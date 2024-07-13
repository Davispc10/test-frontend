import { render, screen } from '@testing-library/react';
import CustomImage from './Image';

describe('CustomImage component', () => {
  it('renders with default props', () => {
    render(<CustomImage src="" alt="" width={500} height={300} />);

    // Verificando se a imagem está presente no documento
    const imageElement = screen.getByAltText('');
    expect(imageElement).toBeInTheDocument();

    // Verificando se a imagem tem as dimensões corretas
    expect(imageElement).toHaveAttribute('width', '500');
    expect(imageElement).toHaveAttribute('height', '300');
  });
});
