// src/components/Promotion/PromotionForm.tsx

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Promotion, PromotionType } from '@/types/promotionTypes';
import InputWithLabel from '@/components/Form/InputWithLabel';
import FormSubmitButton from '@/components/Form/FormSubmitButton';

interface PromotionFormProps {
  products: { id: string; productName: string; company: string; category: string }[];
  initialPromotion: Promotion;
  isEditing: boolean;
  onSubmit: (promotion: Promotion) => void;
}

const PromotionForm: React.FC<PromotionFormProps> = ({ products, initialPromotion, isEditing, onSubmit }) => {
  const [promotion, setPromotion] = useState<Promotion>(initialPromotion);
  const [targetType, setTargetType] = useState<string>('productId');

  useEffect(() => {
    setPromotion(initialPromotion);
  }, [initialPromotion]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPromotion({ ...promotion, [name]: value });
  };

  const handleTargetChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPromotion({ ...promotion, targets: [value] });
  };

  const handleTargetTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTargetType(e.target.value);
    setPromotion({ ...promotion, targets: [] });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(promotion);
  };

  const uniqueCompanies = Array.from(new Set(products.map(product => product.company)));
  const uniqueCategories = Array.from(new Set(products.map(product => product.category)));

  return (
    <form onSubmit={handleFormSubmit} className="mb-6">
      <InputWithLabel
        label="Promotion Name"
        placeholder="Promotion Name"
        form={{ name: 'name', value: promotion.name, onChange: handleChange }}
        error={{ message: '' }} // Pass empty error object if no error
      />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Promotion Type</label>
        <select
          name="type"
          value={promotion.type}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value={PromotionType.Discount}>Discount</option>
          <option value={PromotionType.FreeShipping}>FreeShipping</option>
        </select>
      </div>
      <InputWithLabel
        label="Description"
        placeholder="Description"
        form={{ name: 'description', value: promotion.description, onChange: handleChange }}
        error={{ message: '' }} // Pass empty error object if no error
      />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Target Type</label>
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
        <label className="block text-gray-700 text-sm font-bold mb-2">Target</label>
        <select
          name="targets"
          value={promotion.targets[0] || ''}
          onChange={handleTargetChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        >
          {targetType === 'productId' &&
            products.map(product => (
              <option key={product.id} value={product.id}>
                {product.productName}
              </option>
            ))}
          {targetType === 'company' &&
            uniqueCompanies.map(company => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          {targetType === 'category' &&
            uniqueCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
      </div>
      {promotion.type === PromotionType.Discount && (
        <InputWithLabel
          label="Discount Percentage"
          placeholder="Discount Percentage"
          form={{ name: 'percentage', value: promotion.percentage || '', onChange: handleChange }}
          type="number"
          error={{ message: '' }} // Pass empty error object if no error
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <InputWithLabel
          label="Start Date"
          placeholder="Start Date"
          form={{ name: 'startDate', value: promotion.startDate, onChange: handleChange }}
          type="date"
          error={{ message: '' }} // Pass empty error object if no error
        />
        <InputWithLabel
          label="End Date"
          placeholder="End Date"
          form={{ name: 'endDate', value: promotion.endDate, onChange: handleChange }}
          type="date"
          error={{ message: '' }} // Pass empty error object if no error
        />
      </div>
      <FormSubmitButton className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        {isEditing ? 'Update Promotion' : 'Create Promotion'}
      </FormSubmitButton>
    </form>
  );
};

export default PromotionForm;
