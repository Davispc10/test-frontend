import { useState } from 'react';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return { searchTerm, handleSearch };
};