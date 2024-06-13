// src/components/Promotion/PromotionList.tsx

import React, { useState } from 'react';
import { Promotion, PromotionType } from '@/types/promotionTypes';

interface PromotionListProps {
  promotions: Promotion[];
  onEdit: (promotion: Promotion) => void;
  onDelete: (id: string) => void;
  products: { id: string; productName: string }[];
}

const PromotionList: React.FC<PromotionListProps> = ({ promotions, onEdit, onDelete, products }) => {
  const [filterType, setFilterType] = useState<string>('all');

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value);
  };

  const isCurrentPromotion = (promotion: Promotion) => {
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    return startDate <= now && endDate >= now;
  };

  const filteredPromotions = promotions.filter(promotion => {
    if (filterType === 'all') return true;
    if (filterType === 'current') return isCurrentPromotion(promotion);
    if (filterType === 'past') return !isCurrentPromotion(promotion);
    return true;
  });

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Current Promotions</h3>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="filterType">
          Filter by Promotion Status
        </label>
        <select
          id="filterType"
          value={filterType}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All</option>
          <option value="current">Current</option>
          <option value="past">Past</option>
        </select>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Targets</th>
            <th className="py-2 px-4 border-b">%</th>
            <th className="py-2 px-4 border-b">Start Date</th>
            <th className="py-2 px-4 border-b">End Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPromotions.map(promotion => (
            <tr key={promotion.id}>
              <td className="py-2 px-4 border-b">{promotion.name}</td>
              <td className="py-2 px-4 border-b">{promotion.type}</td>
              <td className="py-2 px-4 border-b">{promotion.description}</td>
              <td className="py-2 px-4 border-b">
                {promotion.targets
                  .map(targetId => {
                    const product = products.find(p => p.id === targetId);
                    return product ? product.productName : targetId;
                  })
                  .join(', ')}
              </td>
              <td className="py-2 px-4 border-b">
                {promotion.percentage !== undefined ? `${promotion.percentage}%` : 'N/A'}
              </td>
              <td className="py-2 px-4 border-b">{promotion.startDate}</td>
              <td className="py-2 px-4 border-b">{promotion.endDate}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-blue-600 hover:text-blue-800 mr-2"
                  onClick={() => onEdit(promotion)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => onDelete(promotion.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PromotionList;
