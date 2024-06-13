// src/pages/admin/marketing-management.tsx

'use client';

import React, { useState, useEffect } from 'react';
import PromotionForm from '@/components/Promotion/PromotionForm';
import PromotionList from '@/components/Promotion/PromotionList';
import { Promotion, PromotionType } from '@/types/promotionTypes';

// Import JSON files
import productsData from '@/data/products.json';
import promotionsData from '@/data/promotions.json';

const MarketingManagement: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [currentPromotion, setCurrentPromotion] = useState<Promotion>({
    id: '',
    name: '',
    type: PromotionType.Discount,
    description: '',
    targets: [],
    startDate: '',
    endDate: '',
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    // Normalize promotions data
    const normalizedPromotions: Promotion[] = promotionsData.map((promotion, index) => ({
      id: (index + 1).toString(),
      name: promotion.name || '',
      type: promotion.type as PromotionType,
      description: promotion.description || '',
      targets: promotion.targets,
      percentage: promotion.percentage,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
    }));
    setPromotions(normalizedPromotions);
  }, []);

  const handleEdit = (promotion: Promotion) => {
    setCurrentPromotion(promotion);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setPromotions(promotions.filter(p => p.id !== id));
  };

  const handleSubmit = (promotion: Promotion) => {
    let updatedTargets: string[] = [];
    if (promotion.targets.some(target => productsData.some(product => product.company === target))) {
      const companyProducts = productsData.filter(product => promotion.targets.includes(product.company));
      updatedTargets = companyProducts.map(product => product.id);
    } else if (promotion.targets.some(target => productsData.some(product => product.category === target))) {
      const categoryProducts = productsData.filter(product => promotion.targets.includes(product.category));
      updatedTargets = categoryProducts.map(product => product.id);
    } else {
      updatedTargets = promotion.targets;
    }

    const updatedPromotion = { ...promotion, targets: updatedTargets };

    if (isEditing) {
      setPromotions(promotions.map(p => p.id === promotion.id ? updatedPromotion : p));
      setIsEditing(false);
    } else {
      setPromotions([...promotions, { ...updatedPromotion, id: (promotions.length + 1).toString() }]);
    }
    setCurrentPromotion({
      id: '',
      name: '',
      type: PromotionType.Discount,
      description: '',
      targets: [],
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="pt-32 pb-32 flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Marketing Management</h2>
        <PromotionForm
          products={productsData}
          initialPromotion={currentPromotion}
          isEditing={isEditing}
          onSubmit={handleSubmit}
        />
        <PromotionList
          promotions={promotions}
          products={productsData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default MarketingManagement;
