'use client';

import React from 'react';
import { Promotion, PromotionType } from '../../types/promotionTypes';
import { Product } from '@/types/productType';
interface PromotionListProps {
  promotions: Promotion[];
  products: Product[];
  onEdit: (promotion: Promotion) => void;
  onDelete: (id: number) => void;
}

const PromotionList: React.FC<PromotionListProps> = ({ promotions, products, onEdit, onDelete }) => {
  const getProductNames = (targets: string[]) => {
    return products
      .filter(product => targets.includes(product.id))
      .map(product => product.productName)
      .join(', ');
  };

  return (
    <div>
      <h3 className="text-xl font-bold mt-8 mb-4">Current Promotions</h3>
      <ul className="list-disc list-inside space-y-2">
        {promotions.map((promotion) => (
          <li key={promotion.id} className="mb-2">
            <strong>Promotion Name:</strong> {promotion.name} <br />
            <strong>Type:</strong> {promotion.type} <br />
            {promotion.type === PromotionType.Discount && (
              <>
                <strong>Discount Percentage:</strong> {promotion.percentage}% <br />
              </>
            )}
            <strong>Targets:</strong> {getProductNames(promotion.targets)} <br />
            <strong>Start Date:</strong> {promotion.startDate} <br />
            <strong>End Date:</strong> {promotion.endDate} <br />
            <button
              onClick={() => onEdit(promotion)}
              className="bg-yellow-500 text-white px-2 py-1 rounded-lg mr-2 hover:bg-yellow-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(promotion.id)}
              className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromotionList;
