// pages/index.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import FilterSidebar from '@/components/Productslice/FilterSidebar';
import ProductGrid from '@/components/Productslice/ProductGrid';
import products from '@/data/products.json';
import promotionsJson from '@/data/promotions.json';
import { Promotion, PromotionType } from '@/types/promotionTypes';



const promotions: Promotion[] = promotionsJson.map(promo => ({
  ...promo,
  type: promo.type as PromotionType
}));

const Home: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search') || '';

  const [filters, setFilters] = useState<string[]>(categoryParam ? categoryParam.split('&&') : []);
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

  const checkPromotions = (productId: string): Promotion[] => {
    return promotions.filter(promo => promo.targets.includes(productId));
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
            checkPromotions={checkPromotions}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
