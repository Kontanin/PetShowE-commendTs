import React, { useState } from 'react';
import { toSlug } from '@/utils/slug';
interface Product {
  id: number;
  name: string;
  price: number; // Change the type to number
  image: string;
  rating: number;
  category: string;
}

interface ProductGridProps {
  filters: string[];
  priceRange: [number, number];
}

const products: Product[] = [
  {
    id: 1,
    name: 'Dog Food A',
    price: 25.0,
    image: '/path/to/image1.png',
    rating: 4.5,
    category: 'Dog',
  },
  {
    id: 2,
    name: 'Cat Food B',
    price: 30.0,
    image: '/path/to/image2.png',
    rating: 4.0,
    category: 'Cat',
  },
  {
    id: 3,
    name: 'Bird Food C',
    price: 15.0,
    image: '/path/to/image3.png',
    rating: 4.8,
    category: 'Bird',
  },
  {
    id: 4,
    name: 'Fish Food D',
    price: 20.0,
    image: '/path/to/image4.png',
    rating: 4.3,
    category: 'Water Animal',
  },
  {
    id: 5,
    name: 'Exotic Animal Food E',
    price: 35.0,
    image: '/path/to/image5.png',
    rating: 4.7,
    category: 'Exotic',
  },
  // Add more products as needed
];

const ProductGrid: React.FC<ProductGridProps> = ({ filters, priceRange }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter(product => {
    const matchesFilters =
      filters.length === 0 || filters.includes(toSlug(product.category));
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesFilters && matchesPrice;
  });

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="border p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover"
            />
            <h3 className="mt-2 font-bold">{product.name}</h3>
            <p className="mt-1">${product.price.toFixed(2)}</p>
            <p className="mt-1">Rating: {product.rating}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
