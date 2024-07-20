import React, { useRef, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  initialSearchTerm: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialSearchTerm }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = initialSearchTerm;
    }
  }, [initialSearchTerm]);

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
          defaultValue={initialSearchTerm}
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