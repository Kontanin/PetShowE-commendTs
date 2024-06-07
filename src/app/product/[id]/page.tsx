"use client"
import { useState, useEffect } from 'react';
import products from './mockData.json';
import Image from 'next/image';
import AddToCartButton from '../../../components/ProductCart/AddToCartButton';
import PriceTag from '@/components/productslice/PriceTag';
import { CartStore } from '@/store/CartStore';
import { UserStore } from '@/store/UserStore';
import {syncCartWithBackend } from '@/utils/syncCartWithBackend'
interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params: { id } }: ProductPageProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [stock, updatestock] = useState(0);
  const { isAuthenticated } = UserStore();

  const newp = products.find(product => product.id === id);
 
  const addToCart = CartStore(state => state.addToCart);

  useEffect(() => {
    if (newp) {
      updatestock(newp.stock);
    }
  }, [newp]);

  if (!newp) {
    return <div className="text-center text-red-600">Product not found</div>;
  }

  const handleQuantityChange = (quantity: number) => {
    setSelectedQuantity(quantity);
  };

  const handleAddtoCart = () => {
    const { stock, ...rest } = newp;
    const cartItem = { ...rest, quantity: selectedQuantity };
    console.log("add")
    addToCart(cartItem);
    newp.stock = stock - selectedQuantity;
    updatestock(stock - selectedQuantity);
    setSelectedQuantity(1);
    if (isAuthenticated) {
      syncCartWithBackend(CartStore.getState().cart);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <Image
            src={newp.image}
            alt={newp.productName}
            width={500}
            height={500}
            className="rounded-lg object-cover shadow-md"
          />
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            {newp.productName}
          </h1>
          <PriceTag
            price={newp.unitPrice}
            className="text-2xl text-green-500 mb-4"
          />
          <p className="text-gray-700 mb-6">{newp.description}</p>
          <p className="text-gray-600 mb-6">
            In stock: <span className="font-medium">{stock - selectedQuantity}</span> ชิ้น
          </p>
          <AddToCartButton
            productId={newp.id}
            stock={newp.stock}
            onQuantityChange={handleQuantityChange}
            handleAddtoCart={handleAddtoCart}
            quantity={selectedQuantity}
          />
        </div>
      </div>
    </div>
  );
}
