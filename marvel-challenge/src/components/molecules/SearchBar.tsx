import React, { useRef } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      onSearch(inputRef.current.value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex shadow-md rounded-lg overflow-hidden">
        <input
          type="text"
          ref={inputRef}
          placeholder="Buscar personagem..."
          className="flex-grow px-4 py-3 text-gray-700 focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-red-600 text-white font-semibold transition duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;