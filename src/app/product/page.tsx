'use client';

import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import FilterSidebar from '@/components/productslice/FilterSidebar';
import ProductGrid from '@/components/productslice/ProductGrid';

import Link from 'next/link';

// import CategoryDropdown from '@/components/productslice/CategoryDropdown';
const Home: NextPage = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  return (
    <div>
      <header className="flex justify-between p-4 bg-yellow-400">
        {/* //<CategoryDropdown /> */}
      </header>
      <div className="flex">
        <div className="w-1/4">
          <FilterSidebar
            filters={filters}
            priceRange={priceRange}
            onFilterChange={setFilters}
            onPriceChange={setPriceRange}
          />
        </div>
        <div className="w-3/4 p-4">
          <ProductGrid filters={filters} priceRange={priceRange} />
        </div>
      </div>
    </div>
  );
};

export default Home;
