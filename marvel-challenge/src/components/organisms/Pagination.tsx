import React from 'react';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="text-gray-700">Página {currentPage}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Próxima
      </button>
    </div>
  );
};

export default Pagination;