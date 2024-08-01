import React from 'react';
import { toSlug } from '@/utils/slug';
import Link from 'next/link';
import Image from 'next/image';
import { Promotion } from '../../types/promotionTypes';
import { Product } from '@/types/productType';
interface ProductGridProps {
  filters: string[] | null;
  priceRange: [number, number];
  products: Product[];
  search: string;
  checkPromotions: (productId: string) => Promotion[];
}

const ProductGrid: React.FC<ProductGridProps> = ({
  filters,
  priceRange,
  products,
  search,
  checkPromotions,
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
        {filteredProducts.map(product => {
          const promotions = checkPromotions(product.id);
          const discountPromotion = promotions.find(
            promo => promo.type === 'Discount',
          );
          const freeShippingPromotion = promotions.find(
            promo => promo.type === 'FreeShipping',
          );

          const discountedPrice = discountPromotion
            ? product.unitPrice -
              (product.unitPrice * discountPromotion.percentage!) / 100
            : product.unitPrice;

          return (
            <Link
              href={'/product/' + product.id}
              className="mt-2 font-bold"
              key={product.id}
            >
              <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 relative">
                <div className="absolute top-2 left-2 space-y-2 z-10">
                  {discountPromotion && (
                    <div className="bg-red-500 text-white px-2 py-1 rounded">
                      {discountPromotion.percentage}% off
                      <div className="text-xs">
                        Save ${(product.unitPrice - discountedPrice).toFixed(2)}
                      </div>
                    </div>
                  )}
                  {freeShippingPromotion && (
                    <div className="bg-green-500 text-white px-2 py-1 rounded">
                      Free Shipping
                    </div>
                  )}
                </div>
                <div className="bg-white grid justify-center justify-items-center-center">
                  <div className=" max-w-xl h- overflow-hidden rounded-lg mb-4 bg-black mt-4">
                    <Image
                      src={product.image}
                      alt={product.productName}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                <p className="text-lg font-semibold">{product.productName}</p>
                {discountPromotion ? (
                  <>
                    <div className="flex">
                      <p className="mt-1 text-red-700 line-through">
                        ${product.unitPrice.toFixed(2)}
                      </p>
                      <p className="mt-1 text-green-700 ml-2">
                        ${discountedPrice.toFixed(2)}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="mt-1 text-gray-700">
                    ${product.unitPrice.toFixed(2)}
                  </p>
                )}
                <p className="mt-1 text-gray-500">Quantity: {product.stock}</p>
                <p className="mt-1 text-gray-500">Company: {product.company}</p>
                <p className="mt-1 text-gray-500">
                  Category: {product.category}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;
