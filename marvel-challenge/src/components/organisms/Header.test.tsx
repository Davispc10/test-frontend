import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('deve renderizar o cabeçalho corretamente', () => {
    render(<Header />);
    
    expect(screen.getByText('Personagens da Marvel')).toBeInTheDocument();
  });

  it('deve ter a classe de estilo correta', () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-red-600');
    expect(header).toHaveClass('text-white');
  });
});