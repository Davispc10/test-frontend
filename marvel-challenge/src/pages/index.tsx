import React, { useState, useEffect } from 'react';
import { useCharacters } from '../hooks/useCharacters';
import CharacterList from '../components/organisms/CharacterList';
import SearchBar from '../components/molecules/SearchBar';
import Pagination from '../components/organisms/Pagination';

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: characters, isLoading, error } = useCharacters(page, searchTerm);

  useEffect(() => {
    // Verifica se está no lado do cliente
    if (typeof window !== 'undefined') {
      const savedPage = localStorage.getItem('marvelPage');
      const savedSearch = localStorage.getItem('marvelSearch');
      
      if (savedPage) {
        setPage(parseInt(savedPage, 10));
      }
      if (savedSearch) {
        setSearchTerm(savedSearch);
      }
    }
  }, []);

  useEffect(() => {
    // Salva no localStorage apenas no lado do cliente
    if (typeof window !== 'undefined') {
      localStorage.setItem('marvelPage', page.toString());
      localStorage.setItem('marvelSearch', searchTerm);
    }
  }, [page, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Personagens da Marvel</h1>
        <SearchBar onSearch={handleSearch} initialSearchTerm={searchTerm} />
        {isLoading ? (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error.message}</div>
        ) : (
          <>
            <CharacterList characters={characters || []} />
            <Pagination currentPage={page} onPageChange={handlePageChange} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;