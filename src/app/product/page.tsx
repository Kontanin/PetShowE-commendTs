// pages/index.tsx or pages/cat.tsx (wherever you want to use it)
"use client";
import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import FilterSidebar from '@/components/productslice/FilterSidebar';
import ProductGrid from '@/components/productslice/ProductGrid';
import { usePathname, useSearchParams } from 'next/navigation';

interface Product {
  id: string;
  productName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  image: string;
  freeShipping: boolean;
  company: string;
  category: string;
}

const products: Product[] = [
  {
    id: 'B3-92-BD-33-BA-DA',
    productName: 'Lentibulariaceae',
    description: 'random detail',
    quantity: 1,
    unitPrice: 354,
    image: '/product/1.jpg',
    freeShipping: true,
    company: 'Sporer-Gerlach',
    category: 'Bird',
  },
  {
    id: 'B4-93-BE-34-CA-DB',
    productName: 'Product B',
    description: 'another detail',
    quantity: 5,
    unitPrice: 200,
    image: '/product/2.jpg',
    freeShipping: false,
    company: 'Example Corp',
    category: 'Cat',
  },
  {
    id: 'C5-94-CF-35-DA-EC',
    productName: 'Product C',
    description: 'some detail',
    quantity: 10,
    unitPrice: 150,
    image: '/product/3.jpg',
    freeShipping: true,
    company: 'Sample Inc',
    category: 'Dog',
  },
  {
    id: 'D6-95-DF-36-EB-FD',
    productName: 'Product D',
    description: 'different detail',
    quantity: 7,
    unitPrice: 220,
    image: '/product/4.jpg',
    freeShipping: false,
    company: 'Test LLC',
    category: 'Water-Animal',
  },
  {
    id: 'E7-96-EF-37-FC-GE',
    productName: 'Exotic Animal Food E',
    description: 'exotic detail',
    quantity: 3,
    unitPrice: 35.0,
    image: '/product/5.jpg',
    freeShipping: true,
    company: 'Exotic Foods Inc',
    category: 'Exotic',
  },
];

const Home: NextPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search') || '';

  const [filters, setFilters] = useState<string[]>(
    categoryParam ? categoryParam.split('&&') : [],
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [search, setSearch] = useState<string>(searchQuery);

  useEffect(() => {
    setFilters(categoryParam ? categoryParam.split('&&') : []);
  }, [categoryParam]);

  const handleFilterChange = (newFilters: string[]) => {
    setFilters(newFilters);
    const url =
      newFilters.length > 0
        ? `${pathname}?category=${newFilters.join('&&')}&search=${search}`
        : pathname;
    window.history.pushState({}, '', url);
  };

  const handleSearchChange = (search: string) => {
    setSearch(search);
    const url = `${pathname}?category=${filters.join('&&')}&search=${search}`;
    window.history.pushState({}, '', url);
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/4">
          <FilterSidebar
            filters={filters}
            priceRange={priceRange}
            onFilterChange={handleFilterChange}
            onPriceChange={setPriceRange}
            search={search}
            onSearchChange={handleSearchChange}
          />
        </div>
        <div className="w-3/4 p-4">
          <ProductGrid
            filters={filters}
            priceRange={priceRange}
            products={products}
            search={search}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
