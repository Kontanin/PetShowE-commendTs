import React, { useState, useEffect } from 'react';
import { toSlug } from '@/utils/slug';
import {SearchStore} from '@/store/SearchStore';

interface FilterSidebarProps {
  filters: string[];
  priceRange: [number, number];
  onFilterChange: (filters: string[]) => void;
  onPriceChange: (priceRange: [number, number]) => void;
  search: string;
  onSearchChange: (search: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  priceRange,
  onFilterChange,
  onPriceChange,
  search,
  onSearchChange,
}) => {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);
  const { searchHistory, addSearchTerm } = SearchStore();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  useEffect(() => {
    if (search) {
      setSuggestions(
        searchHistory.filter((item) =>
          item.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  }, [search, searchHistory]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.value;
    let newFilters;

    if (filters.includes(filter)) {
      newFilters = filters.filter(f => f !== filter);
    } else {
      newFilters = [...filters, filter];
    }

    onFilterChange(newFilters);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    const newPriceRange = [localPriceRange[0], value] as [number, number];
    setLocalPriceRange(newPriceRange);
    onPriceChange(newPriceRange);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (search && !searchHistory.includes(search)) {
      addSearchTerm(search);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="p-4">
      <div className="relative">
        <h3 className="font-bold mb-2">Search</h3>
        <form onSubmit={handleSearchSubmit} className="flex">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search product name"
            className="w-full h-10 border border-gray-300 rounded-l mb-10"
          />
          <button
            type="submit"
            className="p-2 bg-orange-500 text-white rounded-r h-10 hover:bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </form>
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3 className="font-bold mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="500"
          value={localPriceRange[1]}
          className="w-full"
          onChange={handlePriceChange}
        />
        <div className="flex justify-between">
          <span>${localPriceRange[0]}</span>
          <span>${localPriceRange[1]}</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-bold mb-2">Category</h3>
        <div>
          <input
            type="checkbox"
            id="dog"
            value={toSlug('Dog')}
            onChange={handleFilterChange}
            checked={filters.includes(toSlug('Dog'))}
          />
          <label htmlFor="dog" className="ml-2">
            Dog
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="cat"
            value={toSlug('Cat')}
            onChange={handleFilterChange}
            checked={filters.includes(toSlug('Cat'))}
          />
          <label htmlFor="cat" className="ml-2">
            Cat
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="bird"
            value={toSlug('Bird')}
            onChange={handleFilterChange}
            checked={filters.includes(toSlug('Bird'))}
          />
          <label htmlFor="bird" className="ml-2">
            Bird
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="water-animal"
            value={toSlug('Water-animal')}
            onChange={handleFilterChange}
            checked={filters.includes(toSlug('Water-animal'))}
          />
          <label htmlFor="water-animal" className="ml-2">
            Water Animal
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="exoticAnimal"
            value={toSlug('Exotic')}
            onChange={handleFilterChange}
            checked={filters.includes(toSlug('Exotic'))}
          />
          <label htmlFor="exoticAnimal" className="ml-2">
            Exotic
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
