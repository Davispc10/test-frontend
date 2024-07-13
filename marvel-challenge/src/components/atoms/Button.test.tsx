import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button onClick={() => {}}>Clicar aqui</Button>);
    expect(screen.getByText('Clicar aqui')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clicar aqui</Button>);
    fireEvent.click(screen.getByText('Clicar aqui'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Button onClick={() => {}} className="custom-class">Clicar aqui</Button>);
    expect(screen.getByText('Clicar aqui')).toHaveClass('custom-class');
  });

  it('Verificar o estilo do css', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('px-4', 'py-2', 'bg-red-600', 'text-white', 'rounded', 'hover:bg-red-700');
  });
});