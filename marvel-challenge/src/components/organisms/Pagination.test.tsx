import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('deve renderizar os botões de paginação corretamente', () => {
    render(<Pagination currentPage={2} onPageChange={() => {}} />);
    
    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Próxima')).toBeInTheDocument();
    expect(screen.getByText('Página 2')).toBeInTheDocument();
  });

  it('deve chamar onPageChange com a página correta ao clicar nos botões', () => {
    const mockOnPageChange = jest.fn();
    render(<Pagination currentPage={2} onPageChange={mockOnPageChange} />);
    
    fireEvent.click(screen.getByText('Anterior'));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('Próxima'));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('deve desabilitar o botão "Anterior" na primeira página', () => {
    render(<Pagination currentPage={1} onPageChange={() => {}} />);
    
    expect(screen.getByText('Anterior')).toBeDisabled();
    expect(screen.getByText('Próxima')).not.toBeDisabled();
  });
});