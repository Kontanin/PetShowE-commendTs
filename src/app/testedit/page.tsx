'use client';

import React, { useState, useEffect } from 'react';
import PromotionForm from '@/components/Marketing/PromotionForm';
import PromotionList from '@/components/Marketing/PromotionList';
import { Promotion, PromotionType, Product } from '@/components/Marketing/types';

// Import JSON files
import productsData from '@/data/products.json';
import promotionsData from '@/data/promotions.json';

const MarketingManagement: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [currentPromotion, setCurrentPromotion] = useState<Promotion>({
    id: 0,
    name: '',
    type: PromotionType.Discount,
    targets: [],
    startDate: '',
    endDate: '',
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    // Normalize promotions data
    const normalizedPromotions: Promotion[] = promotionsData.map((promotion, index) => ({
      id: index + 1,
      name: promotion.name || '',
      type: promotion.type as PromotionType,
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

  const handleDelete = (id: number) => {
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
      setPromotions([...promotions, { ...updatedPromotion, id: promotions.length + 1 }]);
    }
    setCurrentPromotion({
      id: 0,
      name: '',
      type: PromotionType.Discount,
      targets: [],
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Marketing Management</h2>
      <PromotionForm
        products={productsData}
        initialPromotion={currentPromotion}
        isEditing={isEditing}
        onSubmit={handleSubmit}
      />
      <PromotionList promotions={promotions} products={productsData} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default MarketingManagement;
