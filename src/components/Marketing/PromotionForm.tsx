'use client';

import React, { useState, useEffect } from 'react';
import { Promotion, PromotionType, Product } from './types';

interface PromotionFormProps {
  products: Product[];
  initialPromotion: Promotion;
  isEditing: boolean;
  onSubmit: (promotion: Promotion) => void;
}

const PromotionForm: React.FC<PromotionFormProps> = ({ products, initialPromotion, isEditing, onSubmit }) => {
  const [formState, setFormState] = useState<Promotion>(initialPromotion);
  const [targetType, setTargetType] = useState<string>('productId'); // 'productId', 'company', 'category'

  useEffect(() => {
    setFormState(initialPromotion);
  }, [initialPromotion]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'targets' && e.target instanceof HTMLSelectElement) {
      const selectedTargets = Array.from(e.target.selectedOptions, option => option.value);
      setFormState({
        ...formState,
        [name]: selectedTargets,
      });
    } else {
      setFormState({
        ...formState,
        [name]: name === 'percentage' ? parseInt(value, 10) : value,
      });
    }
  };

  const handleTargetTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetType(e.target.value);
    setFormState({
      ...formState,
      targets: [],
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let updatedTargets: string[] = [];

    if (targetType === 'company') {
      const companyProducts = products.filter(product => formState.targets.includes(product.company));
      updatedTargets = companyProducts.map(product => product.id);
    } else if (targetType === 'category') {
      const categoryProducts = products.filter(product => formState.targets.includes(product.category));
      updatedTargets = categoryProducts.map(product => product.id);
    } else {
      updatedTargets = formState.targets;
    }

    onSubmit({ ...formState, targets: updatedTargets });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Promotion Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
          Promotion Type
        </label>
        <select
          id="type"
          name="type"
          value={formState.type}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value={PromotionType.Discount}>Discount</option>
          <option value={PromotionType.FreeShipping}>Free Shipping</option>
        </select>
      </div>
      {formState.type === PromotionType.Discount && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="percentage">
            Discount Percentage
          </label>
          <input
            type="number"
            id="percentage"
            name="percentage"
            value={formState.percentage || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formState.startDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formState.endDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targetType">
          Target Type
        </label>
        <select
          id="targetType"
          value={targetType}
          onChange={handleTargetTypeChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="productId">Product ID</option>
          <option value="company">Company</option>
          <option value="category">Category</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targets">
          Targets
        </label>
        {targetType === 'productId' && (
          <select
            id="targets"
            name="targets"
            multiple
            value={formState.targets}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.productName}
              </option>
            ))}
          </select>
        )}
        {targetType === 'company' && (
          <select
            id="targets"
            name="targets"
            multiple
            value={formState.targets}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            {Array.from(new Set(products.map(product => product.company))).map(company => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        )}
        {targetType === 'category' && (
          <select
            id="targets"
            name="targets"
            multiple
            value={formState.targets}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            {Array.from(new Set(products.map(product => product.category))).map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {isEditing ? 'Update Promotion' : 'Add Promotion'}
        </button>
      </div>
    </form>
  );
};

export default PromotionForm;
