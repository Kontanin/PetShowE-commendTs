'use client';
import React from 'react';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define types for Product and CartOrder
interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartOrder {
  cart: Product[];
  setCart: (cart: Product[]) => void;
}
export const useCartStore = create<CartOrder>(
  persist(
    set => ({
      cart: [],
      setCart: (cart: Product[]) => {
        set({ cart });
      },
    }),
    {
      name: 'cartStore',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

const CartComponent = () => {
  const { cart, setCart } = useCartStore();

  const addProductToCart = () => {
    const newProduct = { id: 1, name: 'Product 1', price: 100 };
    setCart([...cart, newProduct]);
  };

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.map((product: any) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <button onClick={addProductToCart}>Add Product</button>
    </div>
  );
};

export default CartComponent;
