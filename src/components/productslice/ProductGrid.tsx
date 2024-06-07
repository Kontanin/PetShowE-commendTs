// components/Productslice/ProductGrid.tsx
import React from 'react';
import { toSlug } from '@/utils/slug';
import Link from 'next/link';
import Image from 'next/image';
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

interface ProductGridProps {
  filters: string[] | null;
  priceRange: [number, number];
  products: Product[];
  search: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  filters,
  priceRange,
  products,
  search,
}) => {
  const filteredProducts = products.filter(product => {
    const matchesFilters =
      !filters ||
      filters.length === 0 ||
      filters.includes(toSlug(product.category));
    const matchesPrice =
      product.unitPrice >= priceRange[0] && product.unitPrice <= priceRange[1];
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilters && matchesPrice && matchesSearch;
  });

  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Link
            href={'/product/' + product.id}
            className="mt-2 font-bold"
            key={product.id}
          >
            <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                <Image
                  src={product.image}
                  alt={product.productName}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <p className="text-lg font-semibold">{product.productName}</p>
              <p className="mt-1 text-gray-700">
                ${product.unitPrice.toFixed(2)}
              </p>
              <p className="mt-1 text-gray-500">Quantity: {product.quantity}</p>
              <p className="mt-1 text-gray-500">Company: {product.company}</p>
              <p className="mt-1 text-gray-500">Category: {product.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

