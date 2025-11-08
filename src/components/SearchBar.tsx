import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import useDebounce from '../hooks/useDebounce';
import { DEBOUNCE_DELAY } from '../utils/constants';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the first render to avoid unnecessary API call
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
    } else if (debouncedSearchTerm === '' && !isFirstRender.current) {
      // Only trigger when user clears the search
      onSearch('');
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    // The useEffect will handle calling onSearch('')
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-10 animate-slide-up">
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition duration-500 animate-pulse"></div>
        
        {/* Search input */}
        <div className="relative">
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            <FiSearch className="text-2xl" />
          </div>
          <input
            type="text"
            placeholder="Search anime by title... (e.g., Naruto, Attack on Titan)"
            value={searchTerm}
            onChange={handleChange}
            className="w-full pl-16 pr-20 py-6 glass-dark text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-lg font-medium placeholder:text-gray-500"
          />
          
          {/* Clear button */}
          {searchTerm && (
            <button
              onClick={handleClear}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 z-10 group/clear"
              aria-label="Clear search"
            >
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover/clear:bg-red-500/20 transition-all duration-200">
                <FiX className="text-xl" />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;