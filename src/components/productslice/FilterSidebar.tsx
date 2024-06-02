// components/Productslice/FilterSidebar.tsx
import React, { useState, useEffect } from 'react';
import { toSlug } from '@/utils/slug';

interface FilterSidebarProps {
  filters: string[];
  priceRange: [number, number];
  onFilterChange: (filters: string[]) => void;
  onPriceChange: (priceRange: [number, number]) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  priceRange,
  onFilterChange,
  onPriceChange,
}) => {
  const [localPriceRange, setLocalPriceRange] =
    useState<[number, number]>(priceRange);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.value;

    let newFilters;

    if (filters.includes(filter)) {
      newFilters = filters.filter(f => f !== filter);
    } else {
      newFilters = [...filters, filter];
    }

    onFilterChange(newFilters);
    console.log(
      filter,
      'change',
      filter.includes(toSlug('Water-animal')),
      toSlug('Water-animal'),
      filter,
    );
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    const newPriceRange = [localPriceRange[0], value] as [number, number];
    setLocalPriceRange(newPriceRange);
    onPriceChange(newPriceRange);
  };

  return (
    <div className="p-4">
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
