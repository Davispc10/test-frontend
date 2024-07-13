import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex">
        <input
          type="text"
          placeholder="Buscar personagem..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-red-600 text-white rounded-r-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;