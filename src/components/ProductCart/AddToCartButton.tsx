"use client";
import { useState } from 'react';

interface AddToCartButtonProps {
  productId: string;
  stock: number;
  onQuantityChange: (quantity: number) => void;
  handleAddtoCart: (quantity: number) => void;
  quantity: number;
}

export default function AddToCartButton({
  stock,
  onQuantityChange,
  handleAddtoCart,
  quantity,
}: AddToCartButtonProps) {
  const handleIncrease = () => {
    if (quantity < stock) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <button
          className="w-12 h-12 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition duration-200"
          onClick={handleDecrease}
          disabled={quantity <= 1}
        >
          -
        </button>
        <input
          type="text"
          className="w-16 text-center text-xl border border-gray-300 rounded-md"
          value={quantity}
          readOnly
        />
        <button
          className="w-12 h-12 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition duration-200"
          onClick={handleIncrease}
          disabled={quantity >= stock}
        >
          +
        </button>
        <span className="text-gray-600 text-xl">ชิ้น</span>
      </div>
      <button
        className="w-full flex items-center justify-center p-4 text-lg bg-black text-white rounded-md hover:bg-gray-900 transition duration-200"
        onClick={() => handleAddtoCart(quantity)}
      >
        ADD TO CART
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </button>
    </div>
  );
}
