// src/components/ProductCard.tsx
'use client';
import React, { useState } from 'react';

type ProductCardProps = {
  name: string;
  price: number;
  description: string;
  rating: number;
  imageUrl: string;
};

const ProductCard: React.FC<ProductCardProps> = () => {
  let name = 'Modern Yellow Chair';
  let price = 420;
  let description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  let rating = 4.5;
  let imageUrl = 'https://via.placeholder.com/150';

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('yellow');

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const totalPrice = price * quantity;

  return (
    <div className="flex bg-white shadow-lg rounded-lg">
      <div className="flex-none w-48 relative">
        <img
          src={imageUrl}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-auto p-6">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-xl font-semibold">{name}</h1>
          <div className="text-xl font-semibold text-gray-500">${price}</div>
          <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
            {rating} stars
          </div>
        </div>
        <p className="mt-4">{description}</p>
        <div className="flex items-center mt-4">
          <span className="mr-2">Color:</span>
          <button
            className={`w-6 h-6 rounded-full ${color === 'yellow' ? 'bg-yellow-500' : 'bg-gray-500'}`}
            onClick={() => setColor('yellow')}
          ></button>
          <button
            className={`w-6 h-6 rounded-full ml-2 ${color === 'gray' ? 'bg-gray-500' : 'bg-yellow-500'}`}
            onClick={() => setColor('gray')}
          ></button>
        </div>
        <div className="flex items-center mt-4">
          <span className="mr-2">Quantity:</span>
          <button
            className="w-8 h-8 flex items-center justify-center border border-gray-300"
            onClick={handleDecrease}
          >
            -
          </button>
          <span className="mx-2">{quantity}</span>
          <button
            className="w-8 h-8 flex items-center justify-center border border-gray-300"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <div className="flex items-center mt-4">
          <span className="mr-2">Total Price:</span>
          <span className="text-xl font-semibold text-gray-500">
            ${totalPrice}
          </span>
        </div>
        <div className="flex space-x-3 mt-4 mb-6 text-sm font-medium">
          <div className="flex-auto flex space-x-3">
            <button className="w-full flex items-center justify-center bg-yellow-500 text-white rounded-md py-2 px-4">
              Add to Cart
            </button>
            <button className="w-full flex items-center justify-center border border-gray-300 text-gray-900 rounded-md py-2 px-4">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
