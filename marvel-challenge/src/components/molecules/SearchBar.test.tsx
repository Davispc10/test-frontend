import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('deve chamar onSearch com o termo de busca quando o formulário for submetido', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Buscar personagem...');
    const button = screen.getByText('Buscar');
    
    fireEvent.change(input, { target: { value: 'Hulk' } });
    fireEvent.click(button);
    
    expect(mockOnSearch).toHaveBeenCalledWith('Hulk');
  }); 

  it('deve atualizar o valor do input quando o usuário digitar', () => {
    render(<SearchBar onSearch={() => {}} />);
    
    const input = screen.getByPlaceholderText('Buscar personagem...');
    
    fireEvent.change(input, { target: { value: 'Thor' } });
    
    expect(input).toHaveValue('Thor');
  });
});